const assert = require("assert");

describe("can-spell", () => {
    it("Instantiates properly", () => {
        let cs = require("../can-spell");
        assert.notEqual(cs,undefined);
        assert.notEqual(cs.CanSpell, undefined);

    });
    it("Runs happy path", () => {
        let cs = require("../can-spell");
        let result = cs.CanSpell("Boom", "Baby I miss yoou, day or night, my heart keeps you in my mind")
        //                        -            -        -         -    
        assert.equal(result, true,"Boom should be found in target string");
    });

    it("Runs Angry Path", ()=>{
        let cs = require("../can-spell");
        let result = cs.CanSpell("Boom", "Te amo baby");
        assert.equal(result, false, "Boom should NOT be found in target string");        
    });
});