/**
 * ============================================
 * 誠品電腦周邊 - 配色主題
 * Eslite Computer Peripherals - Color Theme
 * ============================================
 * 
 * @description 網站配色主題定義
 * @author GitHub Copilot & Development Team
 * @version 1.0.0
 * @created 2025-06-19
 * @copyright © 2025 誠品電腦周邊. All rights reserved.
 */

export const colorTheme = {
  // 主要色彩
  primary: {
    richBlack: '#042A2B',      // Rich Black - 深綠黑色
    minimumBlue: '#5EB1BF',    // Minimum Blue - 藍綠色
    lightCyan: '#CDEDF6',      // Light Cyan - 淺藍色
    mandarin: '#EF7B45',       // Mandarin - 橙色
    vermillion: '#D84727'      // Vermillion - 紅橙色
  },
  
  // 功能色彩
  functional: {
    success: '#52c41a',
    warning: '#EF7B45',        // 使用主題橙色
    error: '#D84727',          // 使用主題紅橙色
    info: '#5EB1BF'            // 使用主題藍綠色
  },
  
  // 漸層色彩
  gradients: {
    primary: 'linear-gradient(135deg, #5EB1BF 0%, #042A2B 100%)',
    secondary: 'linear-gradient(135deg, #EF7B45 0%, #D84727 100%)',
    light: 'linear-gradient(135deg, #CDEDF6 0%, #5EB1BF 100%)',
    dark: 'linear-gradient(135deg, #042A2B 0%, #5EB1BF 30%)'
  },
  
  // 文字色彩
  text: {
    primary: '#042A2B',
    secondary: '#5EB1BF',
    light: '#CDEDF6',
    accent: '#EF7B45'
  },
  
  // 背景色彩
  background: {
    primary: '#CDEDF6',
    secondary: '#f8feff',
    dark: '#042A2B',
    card: '#ffffff'
  }
};