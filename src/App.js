import {Component} from 'react'
import {v4} from 'uuid'
import PasswordManager from './components/PasswordManager'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isShow: false,
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    isTrue: false,
    searchInput: '',
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {website, username, password} = this.state
    const initial = website[0].toUpperCase()
    const classNameValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4(),
      initialValue: initial,
      website,
      username,
      password,
      classAdd: classNameValue,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchLists = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {passwordsList} = this.state
    const newList = passwordsList.filter(each => each.id !== id)
    const inCaseOf = newList.length !== 0
    this.setState({passwordsList: newList, isTrue: inCaseOf})
  }

  render() {
    const {
      password,
      username,
      website,
      passwordsList,
      isShow,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const newPasswordList = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newPasswordList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo-image"
          />
          <div className="create-password-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-image1"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-image2"
            />
            <div className="password-container">
              <form className="form-container" onSubmit={this.onSubmitForm}>
                <h1 className="add-password-name">Add New Password</h1>
                <div className="text-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="img"
                  />

                  <input
                    type="text"
                    placeholder="Enter Website"
                    className="input"
                    value={website}
                    onChange={this.onChangeWebsite}
                  />
                </div>
                <div className="text-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="img"
                  />

                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="input"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="text-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="img"
                  />

                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="input"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
          </div>
          <div className="sub-div2-container">
            <div className="first-div">
              <div className="your-password">
                <h1 className="heading-name">Your Passwords</h1>
                <p className="colored-text">{newPasswordList.length}</p>
              </div>
              <div className="search-holder">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="img"
                />
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.searchLists}
                  className="search-input"
                  value={searchInput}
                />
              </div>
            </div>

            <hr className="hr-line" />
            <div className="show-password-container">
              <input
                type="checkbox"
                className="checkbox"
                id="check"
                onChange={this.showPassword}
              />
              <label htmlFor="check" className="label">
                Show Passwords
              </label>
            </div>
            {!isTrue && (
              <div className="empty-state">
                <img
                  alt="no passwords"
                  className="empty-image"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                />
                <p className="no-password">No Passwords</p>
              </div>
            )}
            {isTrue && (
              <ul className="result-container">
                {newPasswordList.map(each => (
                  <PasswordManager
                    key={each.id}
                    passwordDetails={each}
                    isShow={isShow}
                    deleteItem={this.deleteItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
