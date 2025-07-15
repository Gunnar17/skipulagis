import React from 'react';
import MapViewer from '../components/MapViewer';

const KortPage: React.FC = () => (
  <div>
    <h1 className="text-2xl font-semibold mb-4">Kort yfir skipulag á Íslandi</h1>
    <MapViewer />
  </div>
);

export default KortPage;