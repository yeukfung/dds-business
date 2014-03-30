var navClass = function(tabGroup) {
    return {
        navTo: function(view) {
            tabGroup.activeTab.open(view);
        }
    };
};