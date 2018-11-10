var budgetController = (function () {
    var totalIncome = 0, totalExpense = 0;
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
            totalIncome = parseInt(this.incomeArray[index].value) + totalIncome;
            document.querySelector(classN).textContent = '+' + totalIncome;
        } else {
            totalExpense = parseInt(this.expenseArray[index].value) + totalExpense;
            document.querySelector(classN).textContent = '-' + totalExpense;
        }

        var totalBudget = totalIncome - totalExpense;

        document.querySelector(availClass).textContent = totalBudget;
    }

    return {
        incomeArray: [],
        expenseArray: [],
        incomeProto,
        expenseProto,
        budgetManager
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
        totalBudgetValue: '.budget__value'
    };

    var addHTMLToPage = function (obj, type) {
        var html, newHTML;
        console.log(obj.id + "         " + obj.description + "         " + obj.value);
        if (type === 'income') {

            html = '<div class="item clearfix" id="income-%incomeId%"><div class="item__description">%incomeDescription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            newHTML = html.replace('%incomeId%', obj.id);
            newHTML = newHTML.replace('%incomeDescription%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);
            document.querySelector(className.addHTMLIncome).insertAdjacentHTML('beforeend', newHTML);
        } else {

            html = '<div class="item clearfix" id="expense-%expenseId%"><div class="item__description">%expenseDescription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            newHTML = html.replace('%expenseId%', 'obj.id');
            newHTML = newHTML.replace('%expenseDescription%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);
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

        //add item to list
        if (type === 'income') {
            budgetCtrl.incomeArray.push(new budgetCtrl.incomeProto(idIncome, description, value));

            //add item to UI
            uiCtrl.addHTMLToPage(budgetCtrl.incomeArray[idIncome - 1], type);

            //updating total expense and income
            budgetCtrl.budgetManager(type, idIncome - 1, uiController.className.totalIncomeClass, uiController.className.totalBudgetValue);

            idIncome++;
        } else {
            budgetCtrl.expenseArray.push(new budgetCtrl.expenseProto(idExpense, description, value));

            //add item to UI
            uiCtrl.addHTMLToPage(budgetCtrl.expenseArray[idExpense - 1], type);

            //updating total expense and income
            budgetCtrl.budgetManager(type, idExpense - 1, uiController.className.totalExpenseClass, uiController.className.totalBudgetValue);

            idExpense++;
        }



        //cleaning value from description value
        clearFields();

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
        
        //handle event listner
        document.querySelector(uiCtrl.className.addButton).addEventListener('click', eventCodeHandle);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                eventCodeHandle();
            }
        })

    }

    init();
})(budgetController, uiController);

