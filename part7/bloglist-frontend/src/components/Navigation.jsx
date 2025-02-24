import {
  CancelButton as Button,
  NavigationStyle,
  NavigationLink as A
} from '../styled'

const Navigation = ({ handleLogout, name }) => {
  const padding = {
    padding: 5
  }

  return (
    <NavigationStyle>
      <A style={padding} href="/">
        blogs
      </A>
      <A style={padding} href="/users">
        users
      </A>
      <span style={padding}>{name} logged in</span>
      <Button onClick={handleLogout}>logout</Button>
    </NavigationStyle>
  )
}

export default Navigation
