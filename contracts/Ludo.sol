// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Ludo{
    address owner;

    uint initialposition = 0;
    address public player;
    uint playerCount;

    mapping (uint => address) players;



    constructor(){
        owner = msg.sender ;
    }


    function createPlayer() external {
        playerCount++;
        players[playerCount] = msg.sender;
    }
    function getPlayer(uint _id) view external returns(address) {
        return players[_id];
    }

    function playerOneRoll() view external returns(uint) {

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
  



