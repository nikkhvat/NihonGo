import { TextStyle, StyleSheet } from "react-native";
import { isAndroid } from "../constants/platformUtil";

const fontTitleFamilyBold = isAndroid ? "NotoSansJP-Bold" : "SFProDisplay-Bold";
const fontTitleFamilyRegular = isAndroid ? "NotoSansJP-Medium" : "SFProDisplay-Regular";

const fontTextFamilyRegular = isAndroid ? "NotoSansJP-Medium" : "SFProText-Regular";
const fontTextFamilySemibold = isAndroid ? "NotoSansJP-SemiBold" : "SFProDisplay-Semibold";
const fontTextFamilyBold = isAndroid ? "NotoSansJP-SemiBold" : "SFProText-Bold";

export const fonts = {
  regular: { fontFamily: fontTextFamilyRegular, fontWeight: '400' },
  medium: { fontFamily: fontTextFamilyRegular, fontWeight: '500' },
  bold: { fontFamily: fontTextFamilySemibold, fontWeight: '600' },
  heavy: { fontFamily: fontTextFamilyBold, fontWeight: '600' },
} as const;

// Regular Large
export const TypographyRegularLarge: TextStyle = {
  fontFamily: fontTitleFamilyBold,
  fontSize: 96,
  lineHeight: 104,
  fontWeight: "700",
};

// Regular H1
export const TypographyRegularH1: TextStyle = {
  fontFamily: fontTitleFamilyRegular,
  fontSize: 28,
  lineHeight: 32,
  fontWeight: "400",
};

// Regular H2
export const TypographyRegularH2: TextStyle = {
  fontFamily: fontTextFamilyRegular,
  fontSize: 22,
  lineHeight: 26,
  fontWeight: "400",
};

// Regular H3
export const TypographyRegularH3: TextStyle = {
  fontFamily: fontTextFamilyRegular,
  fontSize: 19,
  lineHeight: 24,
  fontWeight: "400",
};

// Regular H4
export const TypographyRegularH4: TextStyle = {
  fontFamily: fontTextFamilyRegular,
  fontSize: 17,
  lineHeight: 22,
  fontWeight: "400",
};

// Regular Paragraph
export const TypographyRegularParagraph: TextStyle = {
  fontFamily: fontTextFamilyRegular,
  fontSize: 15,
  lineHeight: 20,
  fontWeight: "400",
};

// Regular Label
export const TypographyRegularLabel: TextStyle = {
  fontFamily: fontTextFamilyRegular,
  fontSize: 13,
  lineHeight: 16,
  fontWeight: "400",
};

// Regular Caption
export const TypographyRegularCaption: TextStyle = {
  fontFamily: fontTextFamilyRegular,
  fontSize: 11,
  lineHeight: 14,
  fontWeight: "400",
};

// Semi-Bold H1
export const TypographySemiBoldH1: TextStyle = {
  fontFamily: fontTextFamilySemibold,
  fontSize: 28,
  lineHeight: 32,
  fontWeight: "600",
};

// Semi-Bold H2
export const TypographySemiBoldH2: TextStyle = {
  fontFamily: fontTextFamilySemibold,
  fontSize: 22,
  lineHeight: 26,
  fontWeight: "600",
};

// Semi-Bold H3
export const TypographySemiBoldH3: TextStyle = {
  fontFamily: fontTextFamilySemibold,
  fontSize: 19,
  lineHeight: 24,
  fontWeight: "600",
};

// Semi-Bold H4
export const TypographySemiBoldH4: TextStyle = {
  fontFamily: fontTextFamilySemibold,
  fontSize: 17,
  lineHeight: 22,
  fontWeight: "600",
};

// Semi-Bold Paragraph
export const TypographySemiBoldParagraph: TextStyle = {
  fontFamily: fontTextFamilySemibold,
  fontSize: 15,
  lineHeight: 20,
  fontWeight: "600",
};

// Semi-Bold Label
export const TypographySemiBoldLabel: TextStyle = {
  fontFamily: fontTextFamilySemibold,
  fontSize: 13,
  lineHeight: 16,
  fontWeight: "600",
};

// Bold H1
export const TypographyBoldH1: TextStyle = {
  fontFamily: fontTitleFamilyBold,
  fontSize: 28,
  lineHeight: 32,
  fontWeight: "700",
};

// Bold H2
export const TypographyBoldH2: TextStyle = {
  fontFamily: fontTitleFamilyBold,
  fontSize: 22,
  lineHeight: 26,
  fontWeight: "700",
};

// Bold H3
export const TypographyBoldH3: TextStyle = {
  fontFamily: fontTextFamilyBold,
  fontSize: 19,
  lineHeight: 24,
  fontWeight: "700",
};

// Bold H4
export const TypographyBoldH4: TextStyle = {
  fontFamily: fontTextFamilyBold,
  fontSize: 17,
  lineHeight: 22,
  fontWeight: "700",
};

// Bold Paragraph
export const TypographyBoldParagraph: TextStyle = {
  fontFamily: fontTextFamilyBold,
  fontSize: 15,
  lineHeight: 20,
  fontWeight: "700",
};

// Bold Label
export const TypographyBoldLabel: TextStyle = {
  fontFamily: fontTextFamilyBold,
  fontSize: 13,
  lineHeight: 16,
  fontWeight: "700",
};

export const Typography = StyleSheet.create({
  regularLarge: TypographyRegularLarge,
  regularH1: TypographyRegularH1,
  regularH2: TypographyRegularH2,
  regularH3: TypographyRegularH3,
  regularH4: TypographyRegularH4,
  regularParagraph: TypographyRegularParagraph,
  regularLabel: TypographyRegularLabel,
  regularCaption: TypographyRegularCaption,

  boldH1: TypographySemiBoldH1,
  boldH2: TypographySemiBoldH2,
  boldH3: TypographySemiBoldH3,
  boldH4: TypographySemiBoldH4,
  boldParagraph: TypographySemiBoldParagraph,
  boldLabel: TypographySemiBoldLabel,

  semiBoldH4: TypographySemiBoldH4,
});