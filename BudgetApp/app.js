var budgetController = (function () {
    var incomeProto = function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };
    var expenseProto = function(id,description,value,percentage){
        this.id=id,
        this.description=description;
        this.value=value;
        this.percentage=percentage;
    };

    return{
        incomeArray:[],
        expenseArray:[],
        incomeProto,
        expenseProto
    }
})();

var uiController = (function () {
    var className = {
        addType: '.add__type',
        addDescription: '.add__description',
        addValue: '.add__value',
        addButton: '.add__btn',
        addHTMLIncome : '.income__list',
        addHTMLExpense : '.expenses__list'
    };

    var addHTMLToPage = function(obj,type){
        var html,newHTML;
        if(type === 'income'){
            
            html = '<div class="item clearfix" id="income-&id&"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            
            newHTML = html.replace('%id%',obj.id);
            newHTML = html.replace('%description%',obj.description);
            newHTML = html.replace('%value%',obj.value);
            console.log(newHTML)
            document.querySelector(className.addHTMLIncome).insertAdjacentHTML('beforeend',newHTML);
        }else{

            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            newHTML = html.replace('%id%',obj.id);
            newHTML = html.replace('%description%',obj.description);
            newHTML = html.replace('%value%',obj.value);
            console.log(newHTML)
            document.querySelector(className.addHTMLExpense).insertAdjacentHTML('beforeend',newHTML);
        }
    }
    
    return{
        className,
        addHTMLToPage
    }

})();

var appController = (function (budgetCtrl, uiCtrl) {
    var type, description, value, idIncome=1, idExpense=1;
    
    var eventCodeHandle = function () {
        type = document.querySelector(uiCtrl.className.addType).value;
        description = document.querySelector(uiCtrl.className.addDescription).value;
        value = document.querySelector(uiCtrl.className.addValue).value;
        
        //add item to list
        if(type === 'income'){
            budgetCtrl.incomeArray.push(new budgetCtrl.incomeProto(idIncome,description,value));
            //add item to UI
            uiCtrl.addHTMLToPage(budgetCtrl.incomeArray[idIncome-1],type);
            idIncome++;
        }else{  
            budgetCtrl.expenseArray.push(new budgetCtrl.expenseProto(idExpense,description,value));
            //add item to UI
            uiCtrl.addHTMLToPage(budgetCtrl.expenseArray[idExpense-1],type);
            idExpense++;
        }


        //cleaning value from description value
        document.querySelector(uiCtrl.className.addDescription).value="";
        document.querySelector(uiCtrl.className.addValue).value="";
    }

    //handle event listner
    document.querySelector(uiCtrl.className.addButton).addEventListener('click', eventCodeHandle);

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
            eventCodeHandle();
        }
    })
    
    


})(budgetController, uiController);