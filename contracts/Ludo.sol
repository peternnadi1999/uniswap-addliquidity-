// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Ludo{
    address owner;

    uint initialposition = 0;

    struct Player{
        uint id;
        address player;
        bool hasPlayed;
    }

    uint playerCount;

    mapping (uint => Player) players;



    constructor(){
        owner = msg.sender ;
    }


    function createPlayer() external {
        if(playerCount == 4){
            revert("No more space for player");
        }
        playerCount++;
        players[playerCount] = Player(playerCount,msg.sender, false);
        
    }
    function getPlayer(uint _id) view external returns(address) {
        return players[_id].player;
    }

    function playerOneRoll(uint _id) view external returns(uint) {
        Player storage player = players[_id];
        if (player.id != 1){
            revert("Only owner player one can call this function");
        }
        uint randomNum = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp, 
                    block.difficulty,  
                    msg.sender        
                )
            ));
        return randomNum %6 + 1;
            
    }
    function playerTwoRoll(uint _id) view external returns(uint) {
         Player storage player = players[_id];
        if (player.id != 2){
            revert("Only owner player one can call this function");
        }
        uint randomNum = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp, 
                    block.difficulty,  
                    msg.sender        
                )
            ));
        return randomNum %6 + 1;
            
    }
    function playerThreeRoll(uint _id) view external returns(uint) {
         Player storage player = players[_id];
        if (player.id != 3){
            revert("Only owner player one can call this function");
        }
        uint randomNum = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp, 
                    block.difficulty,  
                    msg.sender        
                )
            ));
        return randomNum %6 + 1;
            
    }
    function playerFourRoll(uint _id) view external returns(uint) {
         Player storage player = players[_id];
        if (player.id != 4){
            revert("Only owner player one can call this function");
        }
        uint randomNum = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp, 
                    block.difficulty,  
                    msg.sender        
                )
            ));
        return randomNum %6 + 1;
            
    }

}
  



