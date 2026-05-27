import Header from '@/components/common/Header/Header';

// TODO: 개발 완료 시 삭제하기
export default function HeaderExample() {
  return (
    <div style={{ height: '2000px' }}>
      <div style={{ position: 'relative', height: '80px' }}>
        <Header hasButton={true} />
      </div>

      {/* <div style={{ position: 'relative', height: '80px' }}>
        <Header hasButton={false} />
      </div> */}
    </div>
  );
}
