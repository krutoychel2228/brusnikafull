import { BrowserRouter, Route, Routes } from "react-router-dom"
import InfoCategory from "./components/InfoCategory"
import NavSection from "./components/NavSection"
import NavigationCard from "./components/NavigationCard"
import { EkonomikaIFinansi, OrganizacionnayaDeyatelnost, Prodazhi, ProizvodstvennayaDeyatelnost } from "./statics/pageInfo"
import Sotrudniki from "./pages/Sotrudniki"
import { Formuly } from "./pages/Formuly"
import Article from "./pages/Article"
import WriteArticle from "./pages/WriteArticle"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { AuthContextProvider } from "./context/AuthContext"
import AddLibrary from "./components/AddLibrary"





export default function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <NavSection />
        <Routes>
          <Route path="/" element={<>
            <p className='ml-[250px] font-inter font-medium text-3xl mt-20'>Главная страница</p>
            <section className='grid grid-cols-3 gap-4 ml-[250px] mt-12 w-[1270px]'>
              <NavigationCard header={ProizvodstvennayaDeyatelnost.title} firstLine={ProizvodstvennayaDeyatelnost.firstSubcategory.title} secondLine={ProizvodstvennayaDeyatelnost.secondSubcategory.title} thirdLine={ProizvodstvennayaDeyatelnost.thirdSubcategory.title} to={ProizvodstvennayaDeyatelnost.link} />
              <NavigationCard header={Prodazhi.title} firstLine={Prodazhi.firstSubcategory.title} secondLine={Prodazhi.secondSubcategory.title} thirdLine={Prodazhi.thirdSubcategory.title} to={Prodazhi.link} />
              <NavigationCard header={EkonomikaIFinansi.title} firstLine={EkonomikaIFinansi.firstSubcategory.title} secondLine={EkonomikaIFinansi.secondSubcategory.title} thirdLine={EkonomikaIFinansi.thirdSubcategory.title} to={EkonomikaIFinansi.link} />
              <NavigationCard header={OrganizacionnayaDeyatelnost.title} firstLine={OrganizacionnayaDeyatelnost.firstSubcategory.title} secondLine={OrganizacionnayaDeyatelnost.secondSubcategory.title} thirdLine={OrganizacionnayaDeyatelnost.thirdSubcategory.title} to={OrganizacionnayaDeyatelnost.link} />
              <NavigationCard header="Формулы" firstLine="" secondLine="" thirdLine="" to="/formuly" />
              <NavigationCard header="Сотрудники" firstLine="" secondLine="" thirdLine="" to="/sotrudniki" />
            </section>
          </>} />
          <Route path={ProizvodstvennayaDeyatelnost.link + '*'} element={
            <InfoCategory
              title={ProizvodstvennayaDeyatelnost.title}
              firstSubcategory={ProizvodstvennayaDeyatelnost.firstSubcategory}
              secondSubcategory={ProizvodstvennayaDeyatelnost.secondSubcategory}
              thirdSubcategory={ProizvodstvennayaDeyatelnost.thirdSubcategory}
              link={ProizvodstvennayaDeyatelnost.link}
            />
          } />
          <Route path={Prodazhi.link + '*'} element={
            <InfoCategory
              title={Prodazhi.title}
              firstSubcategory={Prodazhi.firstSubcategory}
              secondSubcategory={Prodazhi.secondSubcategory}
              thirdSubcategory={Prodazhi.thirdSubcategory}
              link={Prodazhi.link}
            />
          } />
          <Route path={EkonomikaIFinansi.link + '*'} element={
            <InfoCategory
              title={EkonomikaIFinansi.title}
              firstSubcategory={EkonomikaIFinansi.firstSubcategory}
              secondSubcategory={EkonomikaIFinansi.secondSubcategory}
              thirdSubcategory={EkonomikaIFinansi.thirdSubcategory}
              link={EkonomikaIFinansi.link}
            />
          } />
          <Route path={OrganizacionnayaDeyatelnost.link + '*'} element={
            <InfoCategory
              title={OrganizacionnayaDeyatelnost.title}
              firstSubcategory={OrganizacionnayaDeyatelnost.firstSubcategory}
              secondSubcategory={OrganizacionnayaDeyatelnost.secondSubcategory}
              thirdSubcategory={OrganizacionnayaDeyatelnost.thirdSubcategory}
              link={OrganizacionnayaDeyatelnost.link}
            />
          } />
          <Route path="/formuly" element={<Formuly />} />
          <Route path="/sotrudniki" element={<Sotrudniki />} />
          <Route path="/articles" element={<Article />} />
          <Route path="/writearticle" element={<WriteArticle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addlibrary" element={<AddLibrary />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}