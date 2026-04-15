{/* NAVBAR */ }
<motion.nav
  initial={{ y: -88, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  style={{
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    padding: "0 40px", height: "72px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: scrolled ? "rgba(13,13,13,0.95)" : "transparent",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    transition: "all 0.4s ease",
  }}
>
  <Link href="/" style={{ textDecoration: "none" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(220,50,30,0.15)", border: "1px solid rgba(220,50,30,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🛞</div>
      <span style={{ color: "#fff", fontSize: "18px", fontWeight: 800, letterSpacing: "0.1em", fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
        NordDäck<span style={{ color: "rgba(220,50,30,0.9)" }}>.</span>
      </span>
    </div>
  </Link>

  <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
    {["Tjänster", "Om oss", "Priser", "Kontakt"].map((item) => (
      <a key={item} href={`#${item.toLowerCase()}`}
        style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", fontWeight: 500, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
      >{item}</a>
    ))}

    {/* KONTO DROPDOWN */}
    <div data-dropdown style={{ position: "relative" }}>
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        style={{ width: "36px", height: "36px", border: "1px solid rgba(220,50,30,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", fontSize: "15px", cursor: "pointer", background: "rgba(220,50,30,0.08)", transition: "all 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(220,50,30,0.8)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(220,50,30,0.4)")}
      >
        👤
      </div>
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{ position: "absolute", top: "48px", right: 0, background: "#0d0d0d", border: "1px solid rgba(220,50,30,0.2)", borderRadius: "10px", overflow: "hidden", minWidth: "180px", zIndex: 200 }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(220,50,30,0.6), transparent)" }} />
            {user ? (
              <>
                <Link href="/konto" onClick={() => setDropdownOpen(false)} style={{ textDecoration: "none" }}>
                  <div style={{ padding: "12px 16px", color: "rgba(255,255,255,0.65)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", fontFamily: "'Barlow', sans-serif", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,50,30,0.08)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                  >
                    🛞 Mina bokningar
                  </div>
                </Link>
                {user.email === "din@email.se" && (
                  <Link href="/admin" onClick={() => setDropdownOpen(false)} style={{ textDecoration: "none" }}>
                    <div style={{ padding: "12px 16px", color: "rgba(220,50,30,0.8)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", fontFamily: "'Barlow', sans-serif", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,50,30,0.08)"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(220,50,30,0.8)"; }}
                    >
                      ⚙ Admin
                    </div>
                  </Link>
                )}
                <div onClick={handleLogout} style={{ padding: "12px 16px", color: "rgba(255,100,100,0.6)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", fontFamily: "'Barlow', sans-serif", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,100,100,0.06)"; e.currentTarget.style.color = "rgba(255,100,100,0.9)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,100,100,0.6)"; }}
                >
                  Logga ut
                </div>
              </>
            ) : (
              <Link href="/medlem" onClick={() => setDropdownOpen(false)} style={{ textDecoration: "none" }}>
                <div style={{ padding: "12px 16px", color: "rgba(220,50,30,0.8)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", fontFamily: "'Barlow', sans-serif", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,50,30,0.08)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(220,50,30,0.8)"; }}
                >
                  Logga in
                </div>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    <motion.a href="#boka" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
      style={{ background: "rgba(220,50,30,0.9)", color: "#fff", padding: "10px 22px", borderRadius: "6px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase" }}
    >Boka tid</motion.a>
  </div>
</motion.nav>