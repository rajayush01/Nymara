// Universal toast notification utility
export const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  const toastContainer = document.createElement('div');
  toastContainer.style.cssText = `
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 10000;
    animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  `;

  const colors = {
    success: { bg: '#10b981', icon: '✓', title: 'Success!' },
    error: { bg: '#ef4444', icon: '✕', title: 'Error!' },
    warning: { bg: '#f59e0b', icon: '⚠', title: 'Warning!' },
    info: { bg: '#3b82f6', icon: 'ℹ', title: 'Info' }
  };

  const { bg, icon, title } = colors[type];

  toastContainer.innerHTML = `
    <style>
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(120%) scale(0.95); }
        to { opacity: 1; transform: translateX(0) scale(1); }
      }
      @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0) scale(1); }
        to { opacity: 0; transform: translateX(120%) scale(0.95); }
      }
      @keyframes shrinkProgress {
        from { width: 100%; }
        to { width: 0%; }
      }
      @keyframes iconPop {
        0% { transform: scale(0) rotate(0deg); }
        50% { transform: scale(1.2) rotate(10deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
    </style>
    <div style="
      background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
      overflow: hidden;
      min-width: 360px;
      max-width: 420px;
      border: 1px solid rgba(0,0,0,0.1);
    ">
      <div style="display: flex; align-items: flex-start; padding: 18px; gap: 14px;">
        <div style="
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: ${bg};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px ${bg}40;
          color: white;
          font-size: 24px;
          font-weight: bold;
          animation: iconPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        ">${icon}</div>
        <div style="flex: 1; padding-top: 2px;">
          <p style="margin: 0; font-weight: 700; font-size: 16px; color: #1f2937;">
            ${title}
          </p>
          <p style="margin: 6px 0 0; font-size: 14px; color: #6b7280; line-height: 1.4;">
            ${message}
          </p>
        </div>
        <button onclick="this.closest('[style*=fixed]').remove()" style="
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #9ca3af;
          font-size: 20px;
          line-height: 1;
          border-radius: 6px;
          transition: all 0.2s;
        " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">×</button>
      </div>
      <div style="height: 4px; background: #f3f4f6;">
        <div style="
          height: 100%;
          background: ${bg};
          border-radius: 0 0 16px 16px;
          animation: shrinkProgress 4s linear forwards;
        "></div>
      </div>
    </div>
  `;

  document.body.appendChild(toastContainer);

  setTimeout(() => {
    toastContainer.style.animation = 'slideOutRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => toastContainer.remove(), 500);
  }, 4000);
};

// Specific toast functions for common use cases
export const showSuccessToast = (message: string) => showToast(message, 'success');
export const showErrorToast = (message: string) => showToast(message, 'error');
export const showWarningToast = (message: string) => showToast(message, 'warning');
export const showInfoToast = (message: string) => showToast(message, 'info');

// Cart-specific toast
export const showCartToast = (message: string, productName?: string) => {
  const toastContainer = document.createElement('div');
  toastContainer.style.cssText = `
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 9999;
    animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  `;

  toastContainer.innerHTML = `
    <style>
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(120%) scale(0.95); }
        to { opacity: 1; transform: translateX(0) scale(1); }
      }
      @keyframes shrinkProgress {
        from { width: 100%; }
        to { width: 0%; }
      }
      @keyframes checkPop {
        0% { transform: scale(0) rotate(0deg); }
        50% { transform: scale(1.2) rotate(10deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
    </style>
    <div style="
      background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(154, 132, 87, 0.1);
      overflow: hidden;
      min-width: 360px;
      max-width: 420px;
      border: 1px solid rgba(154, 132, 87, 0.2);
    ">
      <div style="display: flex; align-items: flex-start; padding: 18px; gap: 14px;">
        <div style="
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9a8457 0%, #b89968 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(154, 132, 87, 0.3);
          animation: checkPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div style="flex: 1; padding-top: 2px;">
          <p style="margin: 0; font-weight: 700; font-size: 16px; color: #1f2937;">Added to Cart!</p>
          ${productName ? `<p style="margin: 4px 0 0; font-size: 14px; color: #6b7280; font-weight: 500;">${productName}</p>` : ''}
          <p style="margin: 6px 0 0; font-size: 13px; color: #9ca3af;">${message}</p>
        </div>
        <button onclick="this.closest('[style*=fixed]').remove()" style="
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #9ca3af;
          font-size: 20px;
          line-height: 1;
          border-radius: 6px;
        ">×</button>
      </div>
      <div style="height: 4px; background: #f3f4f6;">
        <div style="
          height: 100%;
          background: linear-gradient(90deg, #9a8457 0%, #b89968 100%);
          border-radius: 0 0 16px 16px;
          animation: shrinkProgress 4s linear forwards;
        "></div>
      </div>
    </div>
  `;

  document.body.appendChild(toastContainer);

  setTimeout(() => {
    toastContainer.style.animation = 'slideOutRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => toastContainer.remove(), 500);
  }, 4000);
};