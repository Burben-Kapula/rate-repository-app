import {
  Text as NativeText,
  StyleSheet,
  TextProps,
  TextStyle,
} from 'react-native';

import theme from '../theme';

type TextColor = 'textPrimary' | 'textSecondary' | 'primary' | 'error';
type TextFontSize = 'body' | 'subheading';
type TextFontWeight = 'normal' | 'bold';

interface CustomTextProps extends TextProps {
  color?: TextColor;
  fontSize?: TextFontSize;
  fontWeight?: TextFontWeight;
  style?: TextStyle | TextStyle[];
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorError: {
    color: theme.colors.error,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  style,
  ...props
}: CustomTextProps) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'error' && styles.colorError,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
