import { useState, useRef, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import styled from '@emotion/styled'
import { FaSearch, FaBell, FaCommentDots, FaChevronDown } from 'react-icons/fa'
import { IoMdCloseCircle } from 'react-icons/io'
import ProfileStretch from '../Stretch/ProfileStretch'
import useOutsideClick from '../../hooks/useOutsideClick'
import { AuthContext } from '../Auth/AuthContext'

interface searchProps { 
  searchFocus: boolean;
};

interface homeProps { 
  checkMain: boolean;
};

const Nav = styled.nav`
  background: white;
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  height: 78px;
  z-index: 2;
`;

const Logo = styled.div`
  width: 120px;
  display: flex;
  @media all and (max-width: 767px) {
    width: 60px;
  }
`;

const Item = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  border-radius: 100px;
  vertical-align: middle;
  margin: auto;
  &:hover {
    background: #F0F0F0;
  }
`;

const LogoImg = styled.img`
  height: 50%;
  position: absolute;
  top: 12px; left: 12px;
`;

const Home = styled.div<homeProps>`
  background: ${(props) => (props.checkMain ? "black" : "white")};
  color: ${(props) => (props.checkMain ? "white" : "black")};
  vertical-align: middle;
  text-align: center;
  margin: auto;
  border-radius: 30px;
  height: 48px;
  width: 60px;
  font-weight: 800;
  line-height: 48px;
  &:hover {
    background: ${(props) => (props.checkMain ? "black" : "#F0F0F0")};
  }
  @media all and (max-width: 767px) {
    display: none;
  }
`;

const Search = styled.div`
  width: calc(100% - (190px + 120px));
  display: flex;
  @media all and (max-width: 767px) {
    width: calc(100% - (190px + 60px)); //Logo, Menu 크기 빼줌
  }
`;

const SearchBar = styled.div<searchProps>`
  background: #F0F0F0;
  color: #767676;
  width: 96%;
  height: 48px;
  margin: auto;
  border-radius: 30px;
  vertical-align: middle;
  line-height: 48px;
  padding-left: 20px;
  border: ${(props) => (props.searchFocus ? "3.5px solid #7FC1FF" : "none")};
  &:hover {
    background: #E1E1E1;
  }
  @media all and (max-width: 767px) {
    width: ${(props) => (props.searchFocus ? "91%" : "96%")};
  }
`;

const SearchIcon = styled.div<searchProps>`
  display: ${(props) => (props.searchFocus ? "none" : "inline")};
`;

const SearchInput = styled.input<searchProps>`
  border: none;
  background: transparent;
  color: #767676;
  height: 46px;
  margin-left: ${(props) => (props.searchFocus ? "1px" : "5px")};
  font-size: 1.05rem;
  font-weight: 500;
  width: calc(100% - (50px));
  &:focus {
    outline: none;
  }
`;

const Dark = styled.div`
  position: absolute;
  top: 78px;
  width: 100vw; height: 100vh;
  background: rgb(0, 0, 0, 0.25);
`;

const SearchWindow = styled.div`
  position: relative;
  top: 3px;
  background: white;
  width: 95%; 
  min-width: 330px; max-height: 600px;
  padding: 0px 20px 50px 20px;
  border-radius: 0px 0px 20px 20px;
`;

const SWSection = styled.div`
  color: black;
`;

const SearchRecordFlex = styled.div`
  max-width: 820px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SearchRecord = styled.div`
  color: black;
  background: #F0F0F0;
  font-weight: 800;
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
  padding: 0px 15px 0px 15px;
  &:hover {
    background: #E1E1E1;
  }
`;

const FamousGrid = styled.div`
  max-width: 770px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 180px);
  grid-gap: 5px;
`;

const FamousPin = styled.div`
  background: no-repeat center/cover url("https://images.chosun.com/resizer/5RWpufchdlBjPzWIZnKrDum_yl0=/600x399/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/WO4SKPUA62ESBOT2QY7QB5XTAI.jpg");
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.chosun.com/resizer/5RWpufchdlBjPzWIZnKrDum_yl0=/600x399/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/WO4SKPUA62ESBOT2QY7QB5XTAI.jpg");
  color: white;
  font-weight: 800;
  height: 85px;
  line-height: 85px;
  border-radius: 15px;
  text-align: center;
  &:hover {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.chosun.com/resizer/5RWpufchdlBjPzWIZnKrDum_yl0=/600x399/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/WO4SKPUA62ESBOT2QY7QB5XTAI.jpg");
  }
`;

const Menu = styled.div`
  width: 190px;
  display: flex;
`;

const ItemIcon = styled.div`
  position: absolute;
  top: 12px; left: 12px;
`;

const ProfilePic = styled.img`
  position: absolute;
  top: 10px; left: 10px;
  height: 60%;
  border-radius: 100px;
`;

const ItemSamll = styled.div`
  position: relative;
  height: 30px;
  width: 30px;
  border-radius: 100px;
  margin: auto;
  margin-left: -10px;
  &:hover {
    background: #F0F0F0;
  }
`;

const ItemSmallIcon = styled.div`
  position: absolute;
  top: 6px; left: 8px;
`;

const Header: React.FunctionComponent = () => {
  const userInfo = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const userName: string = userInfo?.displayName || '';
  const userEmail: string = userInfo?.email || '';
  const userPicSrc: string = userInfo?.photoURL || '';

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const [profileFocus, setProfileFocus] = useState<boolean>(false);
  const [checkMain, setCheckMain] = useState<boolean>(true);

  const searchOut = useRef() as React.MutableRefObject<HTMLDivElement>;
  const profileOut = useRef() as React.MutableRefObject<HTMLDivElement>;
  useOutsideClick(searchOut, setSearchFocus);
  useOutsideClick(profileOut, setProfileFocus);

  useEffect(() => {
    location.pathname === '/' ? setCheckMain(true) : setCheckMain(false)
  }, [location.pathname])

  useEffect(() => {
    if (localStorage.getItem('Search')) {
      setRecentSearch(JSON.parse(localStorage.getItem('Search') || ""))
    }
  }, [])

  const searchPin = (searchKeyword: string) => { //Pin 검색
    // 최근 검색 기록 있는 경우
    if (localStorage.getItem('Search')) {
      const localSearch = JSON.parse(localStorage.getItem('Search') || "");
      if (localSearch.length === 5) { 
        localSearch.pop();  // 검색 기록 5개면 마지막 요소 삭제
      }
      const newLocalSearch: string[] = [searchKeyword, ...localSearch];
      localStorage.setItem('Search', JSON.stringify(newLocalSearch));
      console.log(searchKeyword, localSearch.length, newLocalSearch)
    } 
    // 최근 검색 기록 없는 경우    
    else { 
      localStorage.setItem('Search', JSON.stringify([searchKeyword]));
    }
    setRecentSearch(JSON.parse(localStorage.getItem('Search') || ""))
  }

  const clearRecentSearch = () => {
    setRecentSearch([]);
    localStorage.removeItem('Search');
  }

  return (
    <Nav>
      {searchFocus ? <Dark /> : null}
      <Logo>
        <Item style={{marginLeft: "15px"}} onClick={e => navigate('/')}>
          <LogoImg src="https://seeklogo.com/images/P/pinterest-logo-8561DDA2E1-seeklogo.com.png" />
        </Item>
        <Home onClick={e => navigate('/')} checkMain={checkMain}> 홈</Home>
      </Logo>
      <Search>
        <SearchBar searchFocus={searchFocus} ref={searchOut}>
          <SearchIcon searchFocus={searchFocus}><FaSearch /></SearchIcon>
          <SearchInput
            placeholder='검색' 
            searchFocus={searchFocus}
            onFocus={e => setSearchFocus(true)}
            value={searchKeyword} 
            onChange={e => setSearchKeyword(e.target.value)}
            onKeyPress={e => e.key === 'Enter' ? searchPin(searchKeyword) : null}
          />
          {searchFocus ?
          <SearchWindow>
            {recentSearch.length > 0 ?
            <div style={{marginBottom: "15px"}}>
              <div style={{display: "flex"}}>
                <SWSection>최근 검색 기록</SWSection>
                <ItemSamll style={{marginTop: "9px", marginLeft: "2px"}}>
                  <div style={{position: "absolute", top: "-5.5px", left: "4.5px"}}>
                    <IoMdCloseCircle size="20" onClick={e => clearRecentSearch()} />
                  </div>
                </ItemSamll>
              </div>
              <SearchRecordFlex>
                {recentSearch.map((search, index) =>
                  <SearchRecord key={index}>{search}</SearchRecord>
                )}
              </SearchRecordFlex>
            </div>
            :null}
            <div>
              <SWSection>Pengterest에서 인기있는 핀</SWSection>
              <FamousGrid>
                <FamousPin>황제 펭귄</FamousPin>
                <FamousPin>황제 펭귄</FamousPin>
                <FamousPin>황제 펭귄</FamousPin>
                <FamousPin>황제 펭귄</FamousPin>
                <FamousPin>황제 펭귄</FamousPin>
                <FamousPin>황제 펭귄</FamousPin>
                <FamousPin>황제 펭귄</FamousPin>
                <FamousPin>황제 펭귄</FamousPin>
              </FamousGrid>
            </div>
          </SearchWindow>
          :null}
        </SearchBar>
      </Search>
      <Menu>
        <Item>
          <ItemIcon><FaBell size="24" color="#767676"/></ItemIcon>
        </Item>
        <Item>
          <ItemIcon><FaCommentDots size="24" color="#767676"/></ItemIcon>
        </Item>
        <Item onClick={e => navigate('/saved')}>
          <ProfilePic src={userPicSrc}></ProfilePic>
        </Item>
        <ItemSamll>
          <ItemSmallIcon ref={profileOut} onClick={e => setProfileFocus(!profileFocus)}>
            <FaChevronDown size="14" color="#767676"/>
            {profileFocus ? 
              <ProfileStretch 
                userName={userName} userEmail={userEmail} userPicSrc={userPicSrc} 
              /> 
            : null}
          </ItemSmallIcon>
        </ItemSamll>
      </Menu>
    </Nav>
  );
};
  
export default Header;