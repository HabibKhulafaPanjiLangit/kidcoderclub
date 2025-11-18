import { useNavigate } from 'react-router-dom';

const classList = [
  { id: 1, name: "Kelas Matematika" },
  { id: 2, name: "Kelas Sains" },
  // Tambahkan kelas lain sesuai kebutuhan
];

const Classes = () => {
  const navigate = useNavigate();

  const handleBuyClick = (classId: number) => {
    navigate(`/checkout/${classId}`);
  };

  return (
    <>
      {classList.map(function (cls) {
          return (
              <div key={cls.id}>
                  <h2>{cls.name}</h2>
                  <button onClick={() => handleBuyClick(cls.id)}>
                      Beli Sekarang
                  </button>
              </div>
          );
      })}
    </>
  );
};

