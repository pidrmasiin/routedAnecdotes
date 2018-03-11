import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
import { ListGroup, ListGroupItem, Grid, Image, Row, Col } from 'react-bootstrap'

const Menu = () => {

  const divStyle = {
    color: 'MEDIUMAQUAMARINE',
    background: 'mistyrose',
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 10
    }
    const actStyle= {
      fontWeight: 'bold',
      color: 'MEDIUMAQUAMARINE'
     }
  return(
    <div style={divStyle}>    
    <NavLink activeStyle={actStyle} exact to="/">anecdotes</NavLink>&nbsp;
    <NavLink activeStyle={actStyle} exact to="/createnew">create new</NavLink>&nbsp;
    <NavLink activeStyle={actStyle} exact to="/about">about</NavLink>&nbsp;
  </div>
)
}


 

const AnecdoteList = ({ anecdotes }) => (
  <ListGroup>
    <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => 
      <ListGroupItem key={anecdote.id} >
      <NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink>
      </ListGroupItem>
       )}
  
  </ListGroup>
)

const About = () => (
  <Grid>
  <Row className="show-grid">
      <Col sm={6} md={3}>
      <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col sm={6} md={3}>
      <h2></h2>
      <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/James_Gosling_2008.jpg/220px-James_Gosling_2008.jpg" circle />
      <h3>James Gosling</h3>
      </Col>
  </Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote, history) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.notify('A new anecdote ' + anecdote.content + ' created!')
   
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  notify = (notification) => {
    this.setState({ notification })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 5000)
  }



  render() {
   
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
        <Router>
          <div>
          <Menu />
          <Notification message={this.state.notification}/>
          <Route exact path="/" render={() =>  
          <AnecdoteList anecdotes={this.state.anecdotes} />} />
          <Route path="/createnew" render={({ history }) => <CreateNew history={history} addNew={this.addNew}/>} />
          <Route path="/about" render={() => <About />   } />
          <Route exact path="/anecdotes/:id" render={({match}) =>
            <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
          />
          <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
