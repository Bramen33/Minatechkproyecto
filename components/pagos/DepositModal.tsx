import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Wallet, CreditCard, X, Copy, AlertCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CRYPTO_OPTIONS = {
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'BNB Smart Chain (BEP20)',
    address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
  },
  USDT: {
    name: 'Tether',
    symbol: 'USDT',
    network: 'Tron (TRC20)',
    address: 'TXn6syu8Gpth6NVwqZ5wvVcfvTGBGgR6DD',
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png'
  }
};

export default function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [depositMethod, setDepositMethod] = useState<'wallet' | 'card' | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'USDT' | null>(null);
  const [showCardPopup, setShowCardPopup] = useState(false);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success('Dirección copiada al portapapeles');
  };

  const handleDepositClick = () => {
    window.open("https://dodgerblue-yak-660861.hostingersite.com/recargar-saldo/", '_blank'); // Abrir el enlace
    setShowCardPopup(true); // Mostrar el popup después del redireccionamiento
  };

  const handleConfirmCardPopup = () => {
    toast.success('Depósito aprobado. Tus fondos se acreditarán en 5-30 minutos.');
    setShowCardPopup(false); // Cerrar el popup después de confirmar
  };

  const resetAndClose = () => {
    setDepositMethod(null);
    setSelectedCrypto(null);
    setShowCardPopup(false); // Asegurarse de que el popup se cierre
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={resetAndClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-xl bg-white p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Recargar Saldo
            </Dialog.Title>
            <button
              onClick={resetAndClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {!depositMethod ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setDepositMethod('wallet')}
                className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all"
              >
                <Wallet className="h-8 w-8 text-indigo-600 mb-2" />
                <span className="font-medium text-gray-900">Cartera Cripto</span>
              </button>
              <button
                onClick={handleDepositClick}
                className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all"
              >
                <CreditCard className="h-8 w-8 text-indigo-600 mb-2" />
                <span className="font-medium text-gray-900">Tarjeta de Crédito/Transferencias Bancarias/Efectivo</span>
              </button>
            </div>
          ) : depositMethod === 'wallet' && !selectedCrypto ? (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(CRYPTO_OPTIONS).map(([key, crypto]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCrypto(key as 'BTC' | 'USDT')}
                  className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                >
                  <img src={crypto.logo} alt={crypto.symbol} className="h-8 w-8 mb-2" />
                  <span className="font-medium text-gray-900">{crypto.name} ({crypto.symbol})</span>
                  <span className="text-sm text-gray-500 mt-1">{crypto.network}</span>
                </button>
              ))}
            </div>
          ) : depositMethod === 'wallet' && selectedCrypto ? (
            <div className="flex flex-col items-center">
              <div className="w-full mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <p className="text-sm text-amber-700">
                  Asegúrate de enviar {selectedCrypto} solo a través de la red{' '}
                  <span className="font-semibold">{CRYPTO_OPTIONS[selectedCrypto].network}</span>
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <QRCodeSVG value={CRYPTO_OPTIONS[selectedCrypto].address} size={200} />
              </div>
              
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Red</span>
                  <span className="font-medium text-gray-900">{CRYPTO_OPTIONS[selectedCrypto].network}</span>
                </div>
                
                <div className="w-full bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 mb-1">Dirección</span>
                    <button
                      onClick={() => handleCopyAddress(CRYPTO_OPTIONS[selectedCrypto].address)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <Copy className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <span className="font-mono text-sm break-all">{CRYPTO_OPTIONS[selectedCrypto].address}</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600 text-center">
                Envía {CRYPTO_OPTIONS[selectedCrypto].name} a esta dirección. El depósito se acreditará automáticamente tras la confirmación en blockchain.
              </p>
            </div>
          ) : (
            <div className="text-center p-6">
              <p className="text-gray-600">
                La funcionalidad de pago con tarjeta de crédito estará disponible pronto.
              </p>
            </div>
          )}

          {(depositMethod || selectedCrypto) && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => selectedCrypto ? setSelectedCrypto(null) : setDepositMethod(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Volver
              </button>
            </div>
          )}
        </Dialog.Panel>
      </div>

      {showCardPopup && (
        <Dialog open={showCardPopup} onClose={() => setShowCardPopup(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-lg rounded-xl bg-white p-6 w-full">
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  Confirmación
                </Dialog.Title>
                <button
                  onClick={() => setShowCardPopup(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-gray-600 text-center mb-4">
                Un correo de confirmación se enviará una vez que el depósito sea procesado. Por favor, espera entre 5 y 30 minutos para que los fondos se acrediten.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleConfirmCardPopup}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  Confirmar
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </Dialog>
  );
}
