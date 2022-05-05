(() => {
    function canSpell(targetWord, searchIn) {

        let searchInPointer = 0;
        for (let i = 0; i < targetWord.length; i++) {
            let curChar = targetWord[i];
            if (searchIn.indexOf(curChar, searchInPointer) == -1) {
                return false;
            }

            searchInPointer = searchIn.indexOf(' ', searchInPointer);
        }

        return true;
    }

    function findChar(targetChar, searchIn, initialPos) {
        return searchIn.indexOf(targetChar, initialPos);
    }

    exports.CanSpell = canSpell;
})();