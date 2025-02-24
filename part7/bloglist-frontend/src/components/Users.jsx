import { Table, Tr, Td } from '../styled'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <tbody>
          <Tr>
            <th></th>
            <th>blogs created</th>
          </Tr>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>
                <a href={`/users/${user.id}`}>{user.name}</a>
              </Td>
              <Td>{user.blogs.length}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
