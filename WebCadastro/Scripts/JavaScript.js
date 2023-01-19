var viewModel = {
    Counter: ko.observable(0),
    inCounter: function () {
        var prevCount = this.Counter();
        this.Counter(prevCount + 1);
        console.log(Counter)
    }
}