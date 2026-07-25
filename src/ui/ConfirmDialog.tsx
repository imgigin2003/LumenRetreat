import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  loading = false,
  danger = false,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
  danger?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center gap-4 text-center">
        {danger && (
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-500/10 text-red-300 ring-1 ring-red-500/20">
            <AlertTriangle className="h-6 w-6" />
          </div>
        )}
        <div className="space-y-1.5">
          <h2 className="text-lg font-semibold text-content">{title}</h2>
          <p className="text-sm text-content-muted">{description}</p>
        </div>
        <div className="mt-2 flex w-full gap-3">
          <Button variant="outline" fullWidth onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            fullWidth
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
