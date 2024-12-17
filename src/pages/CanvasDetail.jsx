import { useParams } from 'react-router-dom';
import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
import { getCanvasBoId, updateTitle } from '../api/canvas';
import { useEffect, useState } from 'react';

function CanvasDetail() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState();

  useEffect(() => {
    const fetchCanvas = async () => {
      const data = await getCanvasBoId(id);
      setCanvas(data);
    };
    fetchCanvas();
  }, [id]);

  const handleTitleChange = async title => {
    try {
      await updateTitle(id, title);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <CanvasTitle value={canvas?.title} onChange={handleTitleChange} />
      <LeanCanvas />
    </div>
  );
}

export default CanvasDetail;
