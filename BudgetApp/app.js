var budgetController = (function () {

    var totalIncome = 0.00, totalExpense = 0.00;
    var incomeProto = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var expenseProto = function (id, description, value, percentage) {
        this.id = id,
        this.description = description;
        this.value = value;
        this.percentage = percentage;
    };

    var budgetManager = function (type, index, classN, availClass) {
        if (type === 'income') {
            totalIncome = parseFloat(this.incomeArray[index].value) + totalIncome;
            document.querySelector(classN).textContent = '+' + totalIncome;
        } else {
            totalExpense = parseFloat(this.expenseArray[index].value) + totalExpense;
            document.querySelector(classN).textContent = '-' + totalExpense;
            var indiPercent=Math.floor( ((this.expenseArray[index].value) * 100) / (totalIncome) );
            if(indiPercent > 0 && indiPercent < 100)
               this.expenseArray[index].percentage = indiPercent;
            else
            this.expenseArray[index].percentage = '--';
        }   

        var totalBudget = totalIncome - totalExpense;
        totalBudget = parseFloat(totalBudget).toFixed(2);
        document.querySelector(availClass).textContent = totalBudget;
    }

    var calculateTotalExpensePercent = function(){
        var totalExxpencePercent = ((totalExpense) * 100) / (totalIncome - totalExpense);
        if (totalExxpencePercent > 0) {
            return Math.floor(totalExxpencePercent)+"%";
        } else { 
            return '--';
        }
    }

    var updateTotalExpenseIncomeAndBudget = function(type,classN,availClass){
        if(type==='income')
            document.querySelector(classN).textContent = '+' + totalIncome;
        else
            document.querySelector(classN).textContent = '-' + totalExpense;

        var totalBudget = totalIncome - totalExpense;
        document.querySelector(availClass).textContent = totalBudget;
    }

    var updateIncomeExpenseArray = function(itemId,type,classN,availClass){
        if(type==='income'){
            this.incomeArray.splice(itemId-1,1);
            totalIncome=0;
            for(var i=0;i<this.incomeArray.length;i++){
                totalIncome=totalIncome + parseInt(this.incomeArray[i].value);
            }
            updateTotalExpenseIncomeAndBudget(type,classN,availClass);
        }else{
            this.expenseArray.splice(itemId-1,1);
            totalExpense=0;
            for(var i=0;i<this.expenseArray.length;i++){
                totalExpense = parseInt(this.expenseArray[i].value) + totalExpense;
            }
            updateTotalExpenseIncomeAndBudget(type,classN,availClass);
        }
    }

    return {
        incomeArray: [],
        expenseArray: [],
        incomeProto,
        expenseProto,
        budgetManager,
        calculateTotalExpensePercent,
        updateIncomeExpenseArray
    }

})();

var uiController = (function () {

    var className = {
        addType: '.add__type',
        addDescription: '.add__description',
        addValue: '.add__value',
        addButton: '.add__btn',
        addHTMLIncome: '.income__list',
        addHTMLExpense: '.expenses__list',
        totalIncomeClass: '.budget__income--value',
        totalExpenseClass: '.budget__expenses--value',
        totalBudgetValue: '.budget__value',
        expensePercentage: '.budget__expenses--percentage',
        containerClass : '.container',
        MonthUpdate : '.budget__title--month'
    };

    var addHTMLToPage = function (obj, type) {
        var html, newHTML;
        if (type === 'income') {

            html = '<div class="item clearfix" id="income-%incomeId%"><div class="item__description">%incomeDescription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            newHTML = html.replace('%incomeId%', obj.id);
            newHTML = newHTML.replace('%incomeDescription%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);
            document.querySelector(className.addHTMLIncome).insertAdjacentHTML('beforeend', newHTML);
        } else {

            html = '<div class="item clearfix" id="expense-%expenseId%"><div class="item__description">%expenseDescription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            newHTML = html.replace('%expenseId%', obj.id);
            newHTML = newHTML.replace('%expenseDescription%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);
            newHTML = newHTML.replace('%percentage%', obj.percentage+'%');
            document.querySelector(className.addHTMLExpense).insertAdjacentHTML('beforeend', newHTML);
        }
    }

    return {
        className,
        addHTMLToPage
    }

})();

var appController = (function (budgetCtrl, uiCtrl) {

    var type, description, value, idIncome = 1, idExpense = 1;

    var eventCodeHandle = function () {
        type = document.querySelector(uiCtrl.className.addType).value;
        description = document.querySelector(uiCtrl.className.addDescription).value;
        value = document.querySelector(uiCtrl.className.addValue).value;
        value = parseFloat( value ).toFixed(2);
        console.log("------------------"+value)
        //add item to list
        if (type === 'income') {
            budgetCtrl.incomeArray.push(new budgetCtrl.incomeProto(idIncome, description, value));

            //updating total expense and income
            budgetCtrl.budgetManager(type, idIncome - 1, uiController.className.totalIncomeClass, uiController.className.totalBudgetValue);

            //add item to UI
            uiCtrl.addHTMLToPage(budgetCtrl.incomeArray[idIncome - 1], type);

            idIncome++;
        } else {
            budgetCtrl.expenseArray.push(new budgetCtrl.expenseProto(idExpense, description, value));

            //updating total expense and income
            budgetCtrl.budgetManager(type, idExpense - 1, uiController.className.totalExpenseClass, uiController.className.totalBudgetValue);

            //add item to UI
            uiCtrl.addHTMLToPage(budgetCtrl.expenseArray[idExpense - 1], type);

            idExpense++;
        }

        //update total percentage expence 
        document.querySelector(uiCtrl.className.expensePercentage).textContent = budgetCtrl.calculateTotalExpensePercent();

        // if remove item is pressed

        document.querySelector(uiCtrl.className.containerClass).addEventListener('click', eventDelegateForRemoveButton);
        
        //cleaning value from description value
        clearFields();

    }

    //function to remove item from UI and update budget
    var eventDelegateForRemoveButton = function(event){
        var itemId = event.target.parentNode.parentNode.parentNode.parentNode.id,type,splitItem,idCopy;
        idCopy = itemId;
        if(itemId){
            splitItem = itemId.split('-');
            type = splitItem[0];
            itemId= splitItem[1];
            if(type === 'income'){
                budgetCtrl.updateIncomeExpenseArray(itemId,type,uiController.className.totalIncomeClass, uiController.className.totalBudgetValue);
                idIncome--;
            }                
            else{
                budgetCtrl.updateIncomeExpenseArray(itemId,type,uiController.className.totalExpenseClass, uiController.className.totalBudgetValue);
                idExpense--;
            }
            deleteItemFromUI(idCopy);
        } 
    }
    
    //remove item from UI
    var deleteItemFromUI = function(id){
        document.getElementById(id).parentNode.removeChild(document.getElementById(id));
    }

    var clearFields = function () {
        //old and not not so good way
        /*document.querySelector(uiCtrl.className.addDescription).value = "";
        document.querySelector(uiCtrl.className.addValue).value = "";*/

        var field = document.querySelectorAll(uiCtrl.className.addDescription + "," + uiCtrl.className.addValue);
        var arrField = Array.prototype.slice.call(field);
        for (var i = 0; i < arrField.length; i++) {
            arrField[i].value = "";
        }
    }

    var init = function () {
        document.querySelector(uiController.className.totalIncomeClass).textContent = 0;
        document.querySelector(uiController.className.totalExpenseClass).textContent = 0;
        document.querySelector(uiController.className.totalBudgetValue).textContent = 0;
        
        document.querySelector(uiController.className.MonthUpdate).textContent = displayMonth();

        //handle event listner
        document.querySelector(uiCtrl.className.addButton).addEventListener('click', eventCodeHandle);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                eventCodeHandle();
            }
        })
    }

    var displayMonth = function(){
        var now = new Date();
        var month = now.getMonth();
        var dateArr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        return dateArr[month]+", "+ now.getFullYear();
    }

    init();

})(budgetController, uiController);

