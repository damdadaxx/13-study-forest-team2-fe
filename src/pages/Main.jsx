import { useState } from 'react';
import { useNavigate } from 'react-router';

import Container from '@/layouts/Container/Container';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useDebounce } from '@/hooks/useDebounce.js';
import { useGetRecentStudies } from '@/hooks/useRecentStudies.js';
import { useStudies } from '@/hooks/useStudy.js';
import { useWindowSize } from '@/hooks/useWindowSize.js';

import { getDayCount } from '@/utils/getDayCount.js';

import styles from '@/pages/Main.module.css';

import Card from '@/components/common/Card/Card.jsx';

export default function Main() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [cursor, setCursor] = useState(null);
  const limit = 6;
  const [sort, setSort] = useState('recent');
  const debouncedKeyword = useDebounce(keyword, 500);
  const query = { keyword: debouncedKeyword, cursor, limit, sort };
  const exploreStudies = useStudies(query);
  const [isToggle, setIsToggle] = useState(false);
  const [selected, setSelected] = useState('최근 순');
  const options = [
    { value: 'recent', label: '최근 순' },
    { value: 'oldest', label: '오래된 순' },
    { value: 'pointDesc', label: '많은 포인트 순' },
    { value: 'pointAsc', label: '적은 포인트 순' },
  ];
  const recentStudiesData = useGetRecentStudies();
  const width = useWindowSize();

  const validRecentStudies = recentStudiesData?.filter(Boolean) ?? [];
  const hasRecentStudies = validRecentStudies.length > 0;
  const hasExploreStudies = exploreStudies?.data?.length > 0;

  return (
    <Container>
      <div className={styles.top}>
        <span className={styles.recentStudies}>최근 조회한 스터디</span>
        <div className={styles.recentStudyBox}>
          {!hasRecentStudies ? (
            <p className={`${styles.empty} ${styles.emptyRecent}`}>
              아직 조회한 스터디가 없어요
              {/* 빈페이지 구현 */}
            </p>
          ) : // 패드,모바일 환경은 스와이퍼 사용 데스크탑은 x
          width <= 1024 ? (
            <Swiper
              slidesPerView={'auto'}
              slidesOffsetBefore={20}
              spaceBetween={16}
              breakpoints={{
                768: {
                  spaceBetween: 24,
                },
              }}
            >
              {validRecentStudies.map((study) => (
                <SwiperSlide key={study.data.id} className={styles.swiperSlide}>
                  <Card
                    nickname={study.data.nickname}
                    title={study.data.title}
                    point={study.data.totalpoint}
                    dayCount={getDayCount(study.data.createdAt)}
                    description={study.data.description}
                    emojiAndCount={study.data.emojis}
                    background={study.data.background}
                    onClick={() => {
                      const ids = JSON.parse(localStorage.getItem('ids')) || [];
                      const filtered = ids.filter((id) => id !== study.data.id);
                      const updated = [study.data.id, ...filtered];
                      const sliced = updated.slice(0, 3);
                      localStorage.setItem('ids', JSON.stringify(sliced));
                      navigate(`/studies/${study.data.id}`);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            validRecentStudies.map((study) => (
              <Card
                key={study.data.id}
                nickname={study.data.nickname}
                title={study.data.title}
                point={study.data.totalpoint}
                dayCount={getDayCount(study.data.createdAt)}
                description={study.data.description}
                emojiAndCount={study.data.emojis}
                background={study.data.background}
                onClick={() => {
                  const ids = JSON.parse(localStorage.getItem('ids')) || [];
                  const filtered = ids.filter((id) => id !== study.data.id);
                  const updated = [study.data.id, ...filtered];
                  const sliced = updated.slice(0, 3);
                  localStorage.setItem('ids', JSON.stringify(sliced));
                  navigate(`/studies/${study.data.id}`);
                }}
              />
            ))
          )}
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.exploreStudies}>스터디 둘러보기</span>
        <div className={styles.controller}>
          <div className={styles.searchBox}>
            <img
              className={styles.searchIcon}
              src="/src/assets/images/icons/ic_search.png"
              alt="searchIcon"
            />
            <input
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setCursor(null);
              }}
              className={styles.search}
              type="text"
              placeholder="검색"
            />
          </div>
          <div className={styles.selectBox}>
            <img
              className={styles.selectIcon}
              src="/src/assets/images/icons/ic_toggle.png"
              alt="toggleIcon"
            />
            <div className={styles.select}>
              <div
                className={styles.selected}
                onClick={() => setIsToggle(!isToggle)}
              >
                {selected}
              </div>
              {isToggle && (
                <ul className={styles.options}>
                  {options.map((option) => (
                    <li
                      className={styles.option}
                      key={option.value}
                      onClick={() => {
                        setSelected(option.label);
                        setSort(option.value);
                        setCursor(null);
                        setIsToggle(false);
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className={styles.exploreStudiesBox}>
          {/* 빈페이지 구현 */}
          {!hasExploreStudies ? (
            <p className={`${styles.empty} ${styles.emptyExplore}`}>
              아직 둘러 볼 스터디가 없어요
            </p>
          ) : (
            exploreStudies.data.map((study) => (
              <Card
                key={study.id}
                nickname={study.nickname}
                title={study.title}
                point={study.totalpoint}
                dayCount={getDayCount(study.createdAt)}
                description={study.description}
                emojiAndCount={study.emojis}
                background={study.background}
                onClick={() => {
                  const ids = JSON.parse(localStorage.getItem('ids')) || [];
                  const filtered = ids.filter((id) => id !== study.id);
                  const updated = [study.id, ...filtered];
                  const sliced = updated.slice(0, 3);
                  localStorage.setItem('ids', JSON.stringify(sliced));
                  navigate(`/studies/${study.id}`);
                }}
              />
            ))
          )}
        </div>
        {exploreStudies?.nextCursor && (
          <button
            className={styles.button}
            onClick={() => setCursor(exploreStudies?.nextCursor)}
          >
            더보기
          </button>
        )}
      </div>
    </Container>
  );
}
