import PropTypes from 'prop-types'
import { Input, SmallButton as Button } from '../styled'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <Input
            data-testid="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <Input
            data-testid="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button type="submit">login</Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
