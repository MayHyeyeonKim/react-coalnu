import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function AppLayout() {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeNav = location.pathname.startsWith("/movies") ? "movies" : location.hash.slice(1) || "home";

  useEffect(() => {
    if (!searchOpen) return;

    const closeSearchOnOutsideClick = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        // 클릭한 곳이 Form 바깥이면 검색창을 닫아.
        setSearchOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeSearchOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeSearchOnOutsideClick);
  }, [searchOpen]);

  const toggleSearch = () => {
    const willOpen = !searchOpen;
    setSearchOpen(willOpen);

    if (willOpen) {
      window.requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-black" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="netflix-logo">
            NETFLIX
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="netflix-nav me-auto my-2 my-lg-0" activeKey={activeNav} navbarScroll>
              <Nav.Link as={Link} to="/" eventKey="home">
                Home
              </Nav.Link>
              <Nav.Link href="#shows" eventKey="shows">
                Shows
              </Nav.Link>
              <Nav.Link as={Link} to="/movies" eventKey="movies">
                Movies
              </Nav.Link>
              <Nav.Link href="#games" eventKey="games">
                Games
              </Nav.Link>
              <Nav.Link href="#new-and-popular" eventKey="new-and-popular">
                New &amp; Popular
              </Nav.Link>
              <Nav.Link href="#my-list" eventKey="my-list">
                My List
              </Nav.Link>
              <Nav.Link href="#languages" eventKey="languages">
                Browse by Languages
              </Nav.Link>
            </Nav>
            <Form
              ref={searchRef}
              className={`netflix-search ${searchOpen ? "is-open" : ""}`}
              onSubmit={(event) => event.preventDefault()}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSearchOpen(false);
                }
              }}
            >
              <button type="button" className="netflix-search-button" onClick={toggleSearch}>
                <i className="bi bi-search" />
              </button>
              <Form.Control
                ref={searchInputRef}
                type="search"
                placeholder="Titles, genres, games"
                disabled={!searchOpen}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
}

export default AppLayout;
