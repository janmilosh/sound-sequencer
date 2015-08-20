describe('Song Service', function() {
  var Song, testSong;
  
  beforeEach(module('drumServices'));
  beforeEach(inject(function(_Song_){
    Song = _Song_;
  }));
  beforeEach(function() {
    testSong = new Song('Test Song')
  });

  it('should create a song instance with the name Test Song', function() {
    expect(testSong.name).toEqual('Test Song');
  });

  it('should create a song instance with 9 drums', function() {
    expect(testSong.drums.length).toEqual(9);
  });

  it('should create a song instance with an empty beats array for each drum', function() {
    angular.forEach(testSong.drums, function(drum) {
      expect(drum.stepsArray).toEqual([]);
    });
  });
});
