import React, { useMemo } from "react";

import { useWindowDimensions, View, StyleSheet } from "react-native";


import Cell from "@/entities/kana/cell/cell";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TABLET_WIDTH } from "@/shared/constants/app";
import { Alphabet, KanaAlphabet } from "@/shared/constants/kana";
import {
  dakuon,
  handakuon,
  base,
  yoon,
  LettersKeys,
  ILetter,
} from "@/shared/data/lettersTable";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { useAppSelector } from "@/shared/model/hooks";
interface EducationKanaTableProps {
  kana: KanaAlphabet.Hiragana | KanaAlphabet.Katakana;
  type: Alphabet;
  onClick?: (id: LettersKeys) => void;
  last?: boolean;
}

const EducationKanaTable: React.FC<EducationKanaTableProps> = ({
  kana,
  type,
  onClick = () => {},
  last,
}) => {
  const letters = useMemo(() => {
    switch (type) {
      case "base":
        return base;
      case "dakuon":
        return dakuon;
      case "handakuon":
        return handakuon;
      default:
        return yoon;
    }
  }, [type]);

  const { width } = useWindowDimensions()

  const itemWidth = width / 6 - 14;
  const itemWidthLong = width / 3 - itemWidth / 3 - 23;

  const levels = useAppSelector((state) => state.statistics.statistics[kana]);
  const isEnabledStats = useAppSelector((state) => state.statistics.isEnabled);

  const { colors } = useThemeContext();

  const { getRomanji } = useGetRomanji();

  const getStartOfRow = (letter: ILetter) => {
    const romanji = getRomanji(letter);

    return (romanji.length < 3 ? romanji[0] : romanji[0] + romanji[1]) + "-";
  };

  const getEndOfColumn = (letter: ILetter) => {
    const romanji = getRomanji(letter);

    return (
      "-" +
      (romanji.length === 2 ? romanji[1] : romanji.length === 1 ? romanji[0] : romanji[2])
    );
  };

  return (
    <View
      style={[
        styles.container,
        { borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.BorderDefault },
        type === "yoon" ? { marginBottom: 0 } : {},
      ]}
    >
      {letters && letters.length > 1 && (
        <View style={styles.rowButtons}>
          <Cell
            key={"0/start_of_line"}
            isLong={false}
            widthDefault={itemWidth}
            widthLong={itemWidthLong}
            kana={kana}
            cell={null}
            isStartOfLine={""}
          />
          {letters[0].map((cell, cellIndex) => (
            <Cell
              key={`${cellIndex}/start_of_column`}
              isLong={letters[0].length === 3}
              widthDefault={itemWidth}
              widthLong={itemWidthLong}
              kana={kana}
              cell={null}
              isStartOfLine={getEndOfColumn(cell)}
            />
          ))}
        </View>
      )}
      {letters &&
        letters.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            <View style={styles.rowButtons}>
              <Cell
                key={`${rowIndex}/start_of_line`}
                isLong={false}
                widthDefault={itemWidth}
                widthLong={itemWidthLong}
                kana={kana}
                cell={null}
                isStartOfLine={getStartOfRow(row[0])}
              />
            </View>
            {((rowIndex === 7 && type === "base") ? [row[0], null, row[1], null, row[2]]
              : (rowIndex === 9 && type === "base") ? [row[0], null, null, null, row[1]]
                : (rowIndex == 10 && type === "base") ? [null, null, row[0], null, null]
                  : row
            ).map((cell, cellIndex) => (
              <Cell
                key={`${rowIndex}/${cellIndex}`}
                onPress={() => cell && onClick(cell.id)}
                isLong={
                  row.length === 3 &&
                  row[0].id !== "9e4e7b1b-2b3c-467d-8c24-be83a4ae5a89"
                }
                widthDefault={itemWidth}
                widthLong={itemWidthLong}
                kana={kana}
                cell={cell}
                indicator={
                  cell && isEnabledStats ? levels[cell.id]?.level : undefined
                }
              />
            ))}
          </View>
        ))}
    </View>
  );
};

export default EducationKanaTable;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 16,
    marginBottom: 30,
    paddingBottom: 30,
    gap: 9,
    width: "100%",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 9,
  },
  rowButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 9,
  },
});
