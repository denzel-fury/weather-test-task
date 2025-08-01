import React from 'react'
import { useTranslation } from "react-i18next";

interface HistorySectionProps {
  history: string[];
  deletedItem: string | null;
  onCitySelect: (city: string) => void;
  onDelete: (city: string) => void;
  onUndo: () => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ history, deletedItem, onCitySelect, onDelete, onUndo }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-4" data-testid="history-section">
      <h3 className="font-bold mb-2">{t("searchHistory")}</h3>
      <ul>
        {history.map((item) => (
          <li key={item} className="flex justify-between items-center mb-1">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => onCitySelect(item)}
              data-testid={`history-${item}`}
            >
              {item}
            </button>
            <button
              onClick={() => onDelete(item)}
              className="text-red-500"
              data-testid={`delete-${item}`}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      {deletedItem && (
        <button
          onClick={onUndo}
          className="text-sm text-green-600 mt-2"
          data-testid="undo-button"
        >
          {t("undoDelete")}
        </button>
      )}
    </div>
  );
};

const MemoizedHistorySection = React.memo(HistorySection);

export default MemoizedHistorySection