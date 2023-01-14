import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import GameResult from '../GameResult'
import Buttons from '../Buttons'

import {
  AppContainer,
  ScoreContainer,
  ItemsContainer,
  Heading,
  ScoreCardContainer,
  ParagraphScore,
  ScoreSpan,
  ItemsImagesContainer,
  PopUpContainer,
  PopUpButton,
  RulesImageContainer,
  RulesImage,
  CloseLineContainer,
  CloseLineButton,
} from './styledComponents'

class Game extends Component {
  state = {
    gameOver: false,
    myOption: {},
    opponentOption: {},
    score: 0,
    result: '',
  }

  onClickPlayAgain = () => this.setState({gameOver: false})

  onGetResult = () => {
    const {myOption, opponentOption, result} = this.state
    return (
      <GameResult
        myOption={myOption}
        opponentOption={opponentOption}
        result={result}
        playAgain={this.onClickPlayAgain}
      />
    )
  }

  onGetButtonId = (id, image) => {
    const {choicesList} = this.props
    const number = Math.floor(Math.random() * choicesList.length)
    if (choicesList[number].id === 'ROCK' && id === 'SCISSORS') {
      this.setState(prevState => ({
        gameOver: true,
        myOption: [id, image],
        opponentOption: choicesList[number],
        score: prevState.score - 1,
        result: 'YOU LOSE',
      }))
    } else if (choicesList[number].id === 'SCISSORS' && id === 'PAPER') {
      this.setState(prevState => ({
        gameOver: true,
        myOption: [id, image],
        opponentOption: choicesList[number],
        score: prevState.score - 1,
        result: 'YOU LOSE',
      }))
    } else if (choicesList[number].id === 'PAPER' && id === 'ROCK') {
      this.setState(prevState => ({
        gameOver: true,
        myOption: [id, image],
        opponentOption: choicesList[number],
        score: prevState.score - 1,
        result: 'YOU LOSE',
      }))
    } else if (choicesList[number].id === id) {
      this.setState({
        gameOver: true,
        myOption: [id, image],
        opponentOption: choicesList[number],
        result: 'IT IS DRAW',
      })
    } else {
      this.setState(prevState => ({
        gameOver: true,
        myOption: [id, image],
        opponentOption: choicesList[number],
        score: prevState.score + 1,
        result: 'YOU WON',
      }))
    }
  }

  onGetImages = () => {
    const {choicesList} = this.props
    return (
      <ItemsImagesContainer>
        {choicesList.map(eachItem => (
          <Buttons
            key={eachItem.id}
            buttonDetails={eachItem}
            onGetId={this.onGetButtonId}
          />
        ))}
      </ItemsImagesContainer>
    )
  }

  render() {
    const {gameOver, score} = this.state
    return (
      <AppContainer>
        <ScoreContainer>
          <ItemsContainer>
            <Heading>
              ROCK
              <br />
              PAPER
              <br />
              SCISSORS
            </Heading>
          </ItemsContainer>
          <ScoreCardContainer>
            <ParagraphScore>Score</ParagraphScore>
            <ScoreSpan>{score}</ScoreSpan>
          </ScoreCardContainer>
        </ScoreContainer>
        {gameOver ? this.onGetResult() : this.onGetImages()}
        <PopUpContainer>
          <Popup modal trigger={<PopUpButton type="button">Rules</PopUpButton>}>
            {close => (
              <RulesImageContainer>
                <CloseLineContainer>
                  <CloseLineButton type="button" onClick={() => close()}>
                    <RiCloseLine />
                  </CloseLineButton>
                </CloseLineContainer>
                <RulesImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </RulesImageContainer>
            )}
          </Popup>
        </PopUpContainer>
      </AppContainer>
    )
  }
}

export default Game
