import styled from 'styled-components'
import { Link } from 'react-router-dom'


export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #ffffff;
    font-size: 0.875rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    letter-spacing: 0.02857em;
   
    &:hover{
        color: limegreen;
    }

`

export const StyledLinkUser = styled(Link)`
    text-decoration: none;
    color: #ffffff;
    font-size: 0.875rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    margin-left: 2rem;
    margin-right: 0.85rem;
   
    &:hover {
        color: limegreen;
    }
`
export const DropDownContent = styled.div`
   
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 145px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    
    & a{
      color: black;
      padding: 12px 12px;
      text-decoration: none;
      display: block;
    }

    & a:hover{
      background-color: #607d8b;
      color: limegreen;
    }
`


export const DropDown = styled.div`
  position: relative;
  display: inline-block;
  
  &:hover ${DropDownContent}{
    display: block;
  }
`

export const ImageTDTLogo = styled(Link)`
    width: 3%;
    margin-right: 10px;
`