import './index.css'

const PasswordManager = props => {
  const {passwordDetails, isShow, deleteItem} = props
  const {
    id,
    username,
    website,
    password,
    initialValue,
    classAdd,
  } = passwordDetails
  const onDeleteItem = () => {
    deleteItem(id)
  }

  return (
    <li className="items-container">
      <p className={`initial ${classAdd}`}>{initialValue}</p>
      <div className="list-content">
        <p className="website">{website}</p>
        <p className="website">{username}</p>
        {isShow ? (
          <p className="website">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-image"
          />
        )}
      </div>
      <button
        className="del-btn"
        type="button"
        onClick={onDeleteItem}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="del-img"
        />
      </button>
    </li>
  )
}

export default PasswordManager
