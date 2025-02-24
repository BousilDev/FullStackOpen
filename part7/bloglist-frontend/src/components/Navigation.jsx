const Navigation = ({ handleLogout, name }) => {
  const navigationStyle = {
    padding: 5,
    margin: 5,
    background: 'lightgray'
  }

  const padding = {
    padding: 5
  }

  return (
    <div style={navigationStyle}>
      <a style={padding} href="/">
        blogs
      </a>
      <a style={padding} href="/users">
        users
      </a>
      <span style={padding}>{name} logged in</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Navigation
