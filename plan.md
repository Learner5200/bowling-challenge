* game
  - frames (in order - maybe a hash?)
  -
* frame
  - complete?
  - rolls = []
  -
  - first_roll
  - second_roll
  - inputRoll(no., score)
  - total
  - outcome
    - strike vs spare vs normal
* roll
  - score
  -

# How program might run

* frame has a property called .bonusRolls, starts at 0, and a property called bonus_time that returns true or false depending on whether bonusRolls is over 0
* hitting a strike adds 2 to it, spare adds 1
* every roll , for every frame for which bonus_time is true, we subtract 1 from bonusRolls and add the value of the roll
* after frame ten, scoring a strike/spare will add bonus rolls to the frame, which are counted normally. Maximum of three.
  - but we disable the normal function that adds the value of the roll to the total, only using the bonus.

ROLL LOGIC

* NORMAL
  - get_roll
  - if total == 10:
    - set strike (adds 2 to bonus rolls)
    - move on!
  - get_roll
  - if total == 10:
    - set spare (adds 1 to bonus rolls)
  - move on!
* FRAME TEN
  - get_roll
  - if total == 10:
    - set strike
    - get_bonus_roll
    - get_bonus_roll
  - get_roll
  - if total == 10:
    - set spare
    - get bonus_roll
  - complete game


# How to use it

* User sees text 'frame 1'
* User inputs number of pins knocked down in first roll
* User clicks submit
  - -->calculates score
  - -->adds this to total
  - -->updates total on screen
* If total = 10
  - if rolls = 1: strike
  - if rolls = 2: spare
  - move on
* If rolls = 2:
  - move on
* else:
  - continue
* HOW DO WE IMPLEMENT MOVING ON VS CONTINUING??
  - mark frame as complete
  - game's current frame is first frame not to be complete
  - jquery loads details for current frame etc.



* WHEN DO WE MOVE FORWARD?
  - when score gets to 10 (need total counter)
    - can then check if spare or not
  - when two balls have been rolled (need ball counter)
  - if score was 10:
    - strike
  - if total


* HOW DO WE IMPLEMENT THE FINAL FRAME?
  - can we override isComplete and say it's complete when (A) there have been two rolls AND there are no bonus rolls remaining OR (B) there have been three rolls
    - complete after two normal rolls
    - not complete after just one roll (need two)
    - not complete after just spare, or strike (because bonus rolls remain)
    - complete after strike and any two rolls, even if one is strike or they are spare (>=3)
    - complete after spare and any roll, even if its a strike (>= 3)
  - what about bonuses though?
    - as it stands bonuses are assigned to all previous complete frames, so none would be assigned to this frame itself
    - BUT maybe that's fine? because any extra rolls ARE the bonus
      - I think this is true. I had worried that if you scored a strike in your second roll, that you had to add the value of the third roll to the frame twice (once for your first strike and once for your second) but that would allow 40 points in the frame and 310 overall which isn't a thing.


  - if frame < 10
    - -->moves to next frame
  - elsif bonus > 0
    - another frame (bonus frame)
  - else
    - -->moves to final page
    - -->displays result
* User inputs number of pins knocked down in second roll and submits
