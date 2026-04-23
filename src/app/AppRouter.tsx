import { Navigate, Route, Routes } from 'react-router-dom';
import { BasilPage } from '../pages/BasilPage/BasilPage';
import { BasilLemonProductPage } from '../pages/BasilLemonProductPage/BasilLemonProductPage';
import { CatalogPage } from '../pages/CatalogPage/CatalogPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { VegetableSeedsPage } from '../pages/VegetableSeedsPage/VegetableSeedsPage';

export function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/vegetable-seeds" element={<VegetableSeedsPage />} />
      <Route path="/catalog/vegetable-seeds/basil" element={<BasilPage />} />
      <Route path="/catalog/vegetable-seeds/basil/lemon" element={<BasilLemonProductPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
