import { useState, useEffect } from 'react'

    const GetPlayerHand = ({deckId, remaining, amount, drawncard}) => {
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)
        const [playerHand, setPlayerHand] = useState({})
        const [busted, setBusted] = useState(false)
        let title = ''
        let playerTotal = 0
        console.log(drawncard)

        const fetchDrawnCard = async () => {
            console.log('fetching card')
            playerHand.cards.push(drawncard.cards[0])
            console.log(playerHand)
        }

        const fetchPlayerHand = async () => {
            try {
                const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${amount}`);
                const data = await response.json();
                console.log(data)
                setPlayerHand(data);
            } catch (error) {
                setError(error);
            };
            setLoading(false);
        }
    
        useEffect(() => {
            if (Object.keys(playerHand).length === 0) {
                fetchPlayerHand();
            }
            if (Object.keys(drawncard).length !== 0) {
                console.log(busted)
                if (busted === false) {
                    fetchDrawnCard();
                    console.log('yes card')
                }
            } else {
                console.log('no card')
            }
        }, [playerHand, drawncard]);

        if (loading) return 'Loading...';
        if (error) return 'Error!';

        playerHand.cards.map((card) => 
            {if (card.value === 'JACK') {
                playerTotal += 10
            } else if (card.value === 'QUEEN') {
                playerTotal += 10
            } else if (card.value === 'KING') {
                playerTotal += 10
            } else if (card.value === 'ACE') {
                playerTotal += 11
            } else {
                playerTotal += parseInt(card.value)
            }
            if (playerTotal > 21 && playerHand.cards[0].value || playerHand.cards[1].value === 'ACE') {
                playerTotal -= 10
            }}
        )
        
        if (playerTotal > 21) {
            title = 'Bust! '
        } else if (playerTotal === 21) {
            title = 'Blackjack! '
        } else {
            title = 'Your hand: '
        }
        
        console.log(playerTotal)

        return (
            <div>
                <h2>{title}{playerTotal}</h2>
                <div className='hand'>
                    {playerHand.cards.map((card) => 
                        <div className='card'>
                            <img src={card.image} alt={card.code} />
                        </div>
                    )}
                </div>
            </div>
        )
    }
    const GetDealerHand = ({deckId, remaining}) => {
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)
        const [dealerHand, setDealerHand] = useState({})
        let dealerTotal = 0

        const fetchDealerHand = async () => {
            try {
                const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
                const data = await response.json();
                console.log(data)
                setDealerHand(data);
            } catch (error) {
                setError(error);
            };
            setLoading(false);
        }
    
        useEffect(() => {
            if (Object.keys(dealerHand).length === 0) {
                fetchDealerHand();
            }
        }, [dealerHand]);

        if (loading) return 'Loading...';
        if (error) return 'Error!';

        dealerHand.cards.map((card) => 
            {if (card.value === 'JACK') {
                dealerTotal += 10
            } else if (card.value === 'QUEEN') {
                dealerTotal += 10
            } else if (card.value === 'KING') {
                dealerTotal += 10
            } else if (card.value === 'ACE') {
                dealerTotal += 11
            } else {
                dealerTotal += parseInt(card.value)
            }
            if (dealerTotal > 21 && dealerHand.cards[0].value || dealerHand.cards[1].value === 'ACE') {
                dealerTotal -= 10
            }}
        )
        console.log(dealerTotal)

        return (
            <div>
            <h2>Dealers hand: {dealerTotal}</h2>
            <div className='hand'>
            {dealerHand.cards.map((card) => 
                <div className='card'>
                    <img src={card.image} alt={card.code} />
                </div>
            )}
            </div>
            </div>
        )
    }


export {GetPlayerHand, GetDealerHand} ;