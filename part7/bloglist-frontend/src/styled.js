import styled from 'styled-components'

export const Page = styled.div`
  background: pink;
  padding: 1em;
`

export const Button = styled.button`
  background: lightgreen;
  font-size: 1.25em;
  margin: 1em;
  padding: 0.2em 0.75em;
  border: 3px solid Blue;
  border-radius: 3px;
  &:hover {
    background-color: rgb(255, 234, 255);
    transition: background-color 0.3s;
  }
`

export const SmallButton = styled.button`
  background: lightgreen;
  padding: 0.2em 0.5em;
  margin: 0.5em;
  border: 1px solid Blue;
  border-radius: 3px;
  &:hover {
    background-color: rgb(255, 234, 255);
    transition: background-color 0.3s;
  }
`

export const CancelButton = styled.button`
  background: LightBlue;
  font-size: 0.85em;
  margin: 1em;
  padding: 0.2em 0.75em;
  border: 2px solid Blue;
  border-radius: 3px;
  color: Red;
  &:hover {
    background-color: rgb(0, 0, 0);
    transition: background-color 1s;
  }
`

export const Input = styled.input`
  margin: 0.25em;
  background: black;
  color: white;
`

export const Link = styled.a`
  margin: 0.25em;
`

export const NavigationStyle = styled.div`
  padding: 5;
  margin: 5;
  background: deeppink;
  color: white;
`

export const NavigationLink = styled.a`
  color: white;
  font-weight: bold;
`

export const H2 = styled.h2`
  background: rgb(255, 136, 175);
  color: White;
  line-height: 2em;
  padding: 0 0.5em 0;
  border-radius: 0.5rem;
`
export const BlogStyle = styled.div`
  padding: 1em 0.5em 1em;
  border: solid;
  border-width: 0.15em;
  border-color: rgb(255, 112, 160);
  marginbottom: 5;
  background: White;
`
export const Ul = styled.ul`
  background-color: rgb(246, 243, 246);
  padding: 1em;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const Li = styled.li`
  margin: 0 1em;
  padding: 0.5em;
  border-bottom: 1px solid #d1d5db;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: rgb(255, 234, 255);
    transition: background-color 0.3s;
  }
`

export const Table = styled.table`
  width: 50%;
  border-collapse: collapse;
  background-color: rgb(251, 249, 251);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: rgb(255, 233, 248);
  }
`

export const Td = styled.td`
  padding: 0.75rem;
  border: 1px solid rgba(255, 166, 249, 0.63);
  text-align: left;
`
