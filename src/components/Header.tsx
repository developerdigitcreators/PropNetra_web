"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";
import { Home, Users, Activity, UserCircle, PlusCircle, Info, Layers, DollarSign, Calendar, MapPin, Bell, Menu, Play, ChevronDown, Grid, List, Award, Zap, Crown } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");
  const headerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    const sections = ["home", "about", "features", "book-demo"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.5 }
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 50;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const isAgentPortal = pathname.startsWith("/agent") || pathname === "/real-estate-agents";

  const menuLinks = isAgentPortal ? [
    { name: "Dashboard", href: "/agent", icon: <Grid size={24} /> },
    { name: "My Listings", href: "/agent/listings", icon: <List size={24} /> },
    { name: "My Subscription", href: "/agent/subscription", icon: <Crown size={24} /> },
    { name: "Refer & Earn", href: "/agent/refer", icon: <Award size={24} /> },
    { name: "Transaction History", href: "/agent/transactions", icon: <Activity size={24} /> },
    { name: "Team Management", href: "/agent/team", icon: <Users size={24} /> },
    { name: "Profile Settings", href: "/agent/profile", icon: <UserCircle size={24} /> },
    { name: "Help & Support", href: "/support", icon: <Info size={24} /> },
  ] : [
    { name: "Home", href: "/#home", icon: <Home size={24} /> },
    { name: "About Us", href: "/#about", icon: <Info size={24} /> },
    { name: "Marketplace", href: "/marketplace", icon: <Layers size={24} /> },
    { name: "Pricing Plans", href: "/pricing", icon: <DollarSign size={24} /> },
    { name: "Join the Network", href: "/signup", icon: <PlusCircle size={24} /> },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-[60] px-8 pt-1 pb-2 flex items-center justify-between pointer-events-none"
      >
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* <div className={`flex items-center bg-dark/40 backdrop-blur-xl border border-white/20 rounded-2xl gap-4 px-4 py-2 transition-all duration-500 origin-top-left ${isScrolled ? 'scale-110' : 'scale-100'}`}> */}
          <div
            className={`flex items-center bg-dark/40 backdrop-blur-xl border border-white/20 rounded-2xl gap-4 px-4 py-2 transition-all duration-500 origin-top-left `}
          >
            <Link
              href="/"
              onClick={(e) => scrollToSection(e, "home")}
              className="relative w-[180px] h-[60px] flex items-center justify-center"
            >
              <Image
                src={"/propnetra_logo_3D_white.png"}
                alt="logo white"
                width={180}
                height={80}
                className="object-contain"
              />
            </Link>
          </div>

          {isAgentPortal && (
            <button className="flex items-center justify-center gap-2 w-[130px] h-[48px] bg-dark/40 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg hover:scale-105 transition-all group ml-6">
              <MapPin
                size={16}
                className="text-primary group-hover:animate-bounce"
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                Gurgaon
              </span>
              <ChevronDown size={14} className="text-white/40" />
            </button>
          )}
        </div>

        {/* Navigation and Buttons Container */}
        <div className="flex items-center gap-4 pointer-events-auto transition-all duration-700">
          {/* Unified Command Center (Nav + Actions) */}
          <div
            className={`flex items-center transition-all duration-700 ${isScrolled ? "bg-dark/40 backdrop-blur-xl border border-white/20 rounded-full px-4 gap-4" : "gap-8"}`}
          >
            <nav
              className={`hidden lg:flex items-center transition-all duration-700 ${
                !isScrolled
                  ? "px-8 py-3 bg-dark/40 backdrop-blur-xl border border-white/20 rounded-full"
                  : "py-3"
              }`}
            >
              <ul className="flex items-center gap-6 md:gap-8">
                {isAgentPortal
                  ? [
                      {
                        name: "Home",
                        href: "/",
                        id: "home",
                        icon: <Home size={18} />,
                      },
                      {
                        name: "Client List",
                        href: "/agent/clients",
                        id: "client-list",
                        icon: <Users size={18} />,
                      },
                      {
                        name: "Activity",
                        href: "/agent/activity",
                        id: "activity",
                        icon: <Activity size={18} />,
                      },
                      {
                        name: "Profile",
                        href: "/agent/profile",
                        id: "profile",
                        icon: <UserCircle size={18} />,
                      },
                      {
                        name: "+ Post",
                        href: "#",
                        id: "post",
                        isSpecial: true,
                      },
                    ].map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className={`text-[11px] font-bold uppercase tracking-widest transition-all relative group flex items-center gap-2 ${activeSection === item.id ? "text-white" : "text-white/60 hover:text-white"}`}
                        >
                          {!item.isSpecial && item.icon}
                          <span
                            className={
                              item.isSpecial ? "gradent_text_color" : ""
                            }
                          >
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    ))
                  : [
                      {
                        name: "Home",
                        href: "/#home",
                        id: "home",
                        page: null,
                        icon: <Home size={18} />,
                      },
                      {
                        name: "About",
                        href: "/#about",
                        id: "about",
                        page: null,
                        icon: <Info size={18} />,
                      },
                      {
                        name: "App Features",
                        href: "/#features",
                        id: "features",
                        page: null,
                        icon: <Layers size={18} />,
                      },
                      {
                        name: "Pricing",
                        href: "/pricing",
                        id: "pricing",
                        page: "/pricing",
                        icon: <DollarSign size={18} />,
                      },
                      {
                        name: "Book Demo",
                        href: "/#book-demo",
                        id: "book-demo",
                        page: null,
                        icon: <Calendar size={18} />,
                      },
                    ].map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className={`text-[12px] font-bold uppercase tracking-widest transition-colors relative group flex items-center gap-2 ${activeSection === item.id ? "text-white" : "text-white/60 hover:text-white"}`}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
              </ul>
            </nav>

            {/* Scrolled Actions: Bell and Menu merge here */}
            {isScrolled && isAgentPortal && (
              <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                <button
                  onClick={() => router.push("/agent/notifications")}
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-all relative"
                >
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-slate-900"></span>
                </button>
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-all"
                >
                  <Menu size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Top Actions: Only visible when NOT scrolled */}
          {!isScrolled && (
            <div className="flex items-center gap-3">
              {isAgentPortal && (
                <div className="flex items-center gap-2 px-2 py-0 bg-dark/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
                  <button
                    onClick={() => router.push("/agent/notifications")}
                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-all relative border-r border-white/10 pr-2 mr-1"
                  >
                    <Bell size={20} />
                    <span className="absolute top-2 right-3 w-2 h-2 bg-primary rounded-full border-2 border-slate-900"></span>
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    <Menu size={20} />
                  </button>
                </div>
              )}

              {!isAgentPortal && (
                <button
                  onClick={() => router.push("/signup")}
                  className="px-8 py-2.5 bg-gradient-to-r from-primary to-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-all"
                >
                  Join Network
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-700 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Blurred Background */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-2xl transition-all duration-700"
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 w-full md:w-[450px] h-full bg-slate-950/80 backdrop-blur-3xl border-l border-white/10 p-12 transition-transform duration-700 ease-expo ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col h-full">
            {/* Header of Menu */}
            <div className="flex items-center justify-between mb-16">
              <h2
                className="text-3xl font-normal text-white"
                style={{ fontFamily: "WastedVindey, serif" }}
              >
                Menu<span className="text-primary">.</span>
              </h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:rotate-90 transition-all duration-500"
              >
                <PlusCircle size={24} className="rotate-45" />
              </button>
            </div>

            {/* Links List */}
            <nav className="flex-1">
              <ul className="space-y-6">
                {menuLinks.map((link, i) => (
                  <li
                    key={i}
                    style={{ transitionDelay: `${i * 100}ms` }}
                    className={`transform transition-all duration-700 ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                        {link.icon}
                      </div>
                      <div>
                        <span className="block text-lg font-bold text-white/80 group-hover:text-white transition-colors uppercase tracking-widest">
                          {link.name}
                        </span>
                      </div>
                      <ChevronDown
                        size={20}
                        className="ml-auto -rotate-90 text-white/20 group-hover:text-primary transition-all"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer of Menu */}
            <div className="pt-12 border-t border-white/10">
              <div className="flex items-center gap-4 px-4 py-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-widest">
                    Abhishek Goldy
                  </p>
                  <p className="text-[10px] text-white/40 font-bold uppercase">
                    Elite Partner
                  </p>
                </div>
                <button className="ml-auto text-red-400 hover:text-red-500 transition-colors">
                  <Zap size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
