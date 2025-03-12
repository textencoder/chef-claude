import './header.css'
import chefClaudeLogo from "/src/assets/chef-claude-icon.png"

export default function Header() {
    return (
        <header>
        <img src={chefClaudeLogo} alt="" />
        <h1>Chef Claude</h1>
        </header>
    )
}