var budgetController = (function () {
    var incomeProto = function(description,value){
        this.description=description;
        this.value=value;
    };
    var expenseProto = function(description,value,percentage){
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
    };

    return{
        className
    }

})();

var appController = (function (budgetCtrl, uiCtrl) {
    var type, description, value;
    
    var eventCodeHandle = function () {
        type = document.querySelector(uiCtrl.className.addType).value;
        description = document.querySelector(uiCtrl.className.addDescription).value;
        value = document.querySelector(uiCtrl.className.addValue).value;
        
        //add item to list
        if(type === 'income'){
            budgetCtrl.incomeArray.push(new budgetCtrl.incomeProto(description,value))
        }else{
            budgetCtrl.expenseArray.push(new budgetCtrl.expenseProto(description,value))
        }
    }

    //handle event listner
    document.querySelector(uiCtrl.className.addButton).addEventListener('click', eventCodeHandle);

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
            eventCodeHandle();
        }
    })
    
    //add item to UI


})(budgetController, uiController);