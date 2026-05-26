import Header from '@/components/common/Header/Header';

// TODO: 개발 완료 시 삭제하기
export default function HeaderExample() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '100px',
        padding: '20px',
      }}
    >
      <div>
        <p>버튼 있는 버전</p>
        <div style={{ position: 'relative', height: '80px' }}>
          <Header showButton={true} />
        </div>
      </div>

      <div>
        <p>버튼 없는 버전</p>
        <div style={{ position: 'relative', height: '80px' }}>
          <Header showButton={false} />
        </div>
      </div>
    </div>
  );
}
