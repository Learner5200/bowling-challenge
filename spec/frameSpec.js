describe("Frame", function() {
  var Frame = require("../lib/frame")
  var Game = require("../lib/game")
  var frame;
  var frameTwo;
  var finalFrame;
  var game;

  beforeEach(function() {
    game = new Game;
    frame = game.frames[0];
    frameTwo = game.frames[1];
    finalFrame = game.frames[9];
  });

  describe("total", function() {
    it("starts at 0", function() {
      expect(frame.total).toEqual(0);
    });
  });

  describe(".add()", function() {
    it("adds value to total", function() {
      frame.add(5);
      expect(frame.total).toEqual(5);
    });
  });

  describe(".roll()", function() {
    it("adds roll to rolls", function() {
      frame.roll(5);
      expect(frame.rolls).toEqual(1);
    });
    it("adds its value to previous frame totals if they are due a bonus", function() {
      frame.roll(10);
      frameTwo.roll(5);
      expect(frame.total).toEqual(15);
    });
  });

  describe(".hasBonus()", function() {
    it("begins false", function() {
      expect(frame.hasBonus()).toEqual(false);
    });
  });

  describe(".bonusRolls", function() {
    it("begins empty", function() {
      expect(frame.bonusRolls).toEqual(0);
    });
    it("increments by 2 after strike", function() {
      frame.roll(10);
      expect(frame.bonusRolls).toEqual(2);
    });
    it("increments by 1 after spare", function() {
      frame.roll(5);
      frame.roll(5);
      expect(frame.bonusRolls).toEqual(1);
    });
    it("decreases by 1 after another roll", function() {
      frame.roll(10);
      frameTwo.roll(1);
      expect(frame.bonusRolls).toEqual(1);
    });
  });

  describe(".expendBonus()", function() {
    it("reduces bonusRolls by 1", function() {
      frame.roll(10);
      frame.expendBonus(5);
      expect(frame.bonusRolls).toEqual(1);
    });
    it("adds value to total", function() {
      frame.roll(10);
      frame.expendBonus(5);
      expect(frame.total).toEqual(15);
    });
  });

  describe(".accepts()", function() {
    it("returns true if value doesn't take total above 10", function() {
      expect(frame.accepts(5)).toEqual(true);
    });
    it("returns false if value greater than 10", function() {
      expect(frame.accepts(11)).toEqual(false);
    });
    it("returns false if value less than 0", function() {
      expect(frame.accepts(-1)).toEqual(false);
    });
    it("returns false if value is not an integer", function() {
      expect(frame.accepts("string")).toEqual(false);
    });
    describe("for first nine frames", function() {
      it("returns false if value takes total above 10", function() {
        frame.roll(4);
        expect(frame.accepts(7)).toEqual(false);
      });
    });
    describe("for final frame", function() {
      it("returns true if value takes total above 10 after a strike", function() {
        finalFrame.roll(10);
        expect(finalFrame.accepts(10)).toEqual(true);
      });
      it("returns false if value takes total above 20 after a strike and a sub-10 roll", function() {
        finalFrame.roll(10);
        finalFrame.roll(5);
        expect(finalFrame.accepts(6)).toEqual(false);
      });
    });
  });

  describe(".isComplete()", function() {
    it("is initially false", function() {
      expect(frame.isComplete()).toEqual(false);
    });
    it("is false after one normal roll", function() {
      frame.roll(3);
      expect(frame.isComplete()).toEqual(false);
    })
    it("becomes true after two normal rolls", function() {
      frame.roll(1);
      frame.roll(2);
      expect(frame.isComplete()).toEqual(true);
    });

    describe("for frames 1-9", function() {
      it("becomes true after strike", function() {
        frame.roll(10);
        expect(frame.isComplete()).toEqual(true);
      });
      it("becomes true after spare", function() {
        frame.roll(5);
        frame.roll(5);
        expect(frame.isComplete()).toEqual(true);
      });
    });

    describe("for frame 10", function() {
      it("remains false after strike", function() {
        finalFrame.roll(10);
        expect(finalFrame.isComplete()).toEqual(false);
      });
      it("remains false after spare", function() {
        finalFrame.roll(5);
        finalFrame.roll(5);
        expect(finalFrame.isComplete()).toEqual(false);
      });
      it("returns true after three rolls following strike", function() {
        finalFrame.roll(10);
        finalFrame.roll(10);
        finalFrame.roll(10);
        expect(finalFrame.isComplete()).toEqual(true);
      });
      it("returns true after three rolls following spare", function() {
        finalFrame.roll(5);
        finalFrame.roll(5);
        finalFrame.roll(5);
        expect(finalFrame.isComplete()).toEqual(true);
      });
    });
  });
});
