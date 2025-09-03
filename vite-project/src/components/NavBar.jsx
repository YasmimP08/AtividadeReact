import { NavLink } from "react-router-dom"   

const linkStyle = ({ isActive }) => ({       
    marginRight: 8,
    textDecoration: "none",
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #ddd",
    background: isActive ? "#FFAA00": "#990000",
    color: isActive ? "#990000ff": "#FFAA00"
})

export default function Navbar() {           
    return(
        <nav style={{                       
            display: "flex",                 
            alignItems: "center",          
            gap: 8,                      
            padding: 12,                 
            borderBottom: "1px solid #990000"  
        }}>
            <NavLink to="/" style={linkStyle}>Home</NavLink>     
            <NavLink to="/favoritos" style={linkStyle}>Favoritos</NavLink>
        </nav>
    )
}