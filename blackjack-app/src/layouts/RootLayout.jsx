import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="">
      <header className="">
        <h1 className="">Blackjack Front-End Eindopdracht</h1>
        <nav className="">
            <div className="buttons">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="Blackjack">Start spel</NavLink>
            </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}