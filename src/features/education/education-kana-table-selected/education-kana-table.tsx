import React, { useCallback, useMemo } from "react";

import { Dimensions, View, ScrollView, StyleSheet, useWindowDimensions } from "react-native";

import { RootState } from "@/app/store";
import Cell from "@/entities/kana/cell/cell";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import {
  setKanaSelected,
  toggleLetter,
  toggleSome,
} from "@/pages/kana/kana-table-choice-letters-page/model/slice";
import { Alphabet, KanaAlphabet, KanaSection, LETTERS_COUNT } from "@/shared/constants/kana";
import {
  ILetter,
  dakuon,
  handakuon,
  base,
  yoon,
} from "@/shared/data/lettersTable";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface EducationKanaTableProps {
  kana: KanaAlphabet.Hiragana | KanaAlphabet.Katakana;
  type: Alphabet;
  last?: boolean;
}

const EducationKanaTableSelected: React.FC<EducationKanaTableProps> = ({
  kana,
  type,
  last,
}) => {
  const { width } = useWindowDimensions()
  const dispatch = useAppDispatch();

  const screenAdaptiveWidth =
    width > 500 ? width * 0.68 : width;
  const itemWidth = screenAdaptiveWidth / 6 - 16;
  const itemWidthLong = screenAdaptiveWidth / 3 - itemWidth / 3 - 23;


  const { colors } = useThemeContext();

  const getData = useCallback((type: Alphabet) => {
    if (type === "base") return base;
    else if (type === "dakuon") return dakuon;
    else if (type === "handakuon") return handakuon;
    else if (type === "yoon") return yoon;
  }, []);

  const selected = useAppSelector(
    (state: RootState) => state.kana.selected,
  );

  const selectedLetters = selected[type][kana]

  const data = useMemo(() => getData(type), [getData, type]);

  function getLettersWithStatuses(
    letters: (ILetter)[][] | undefined,
    selectedLetters: string[]
  ) {
    if (!letters) return [];

    const selectedLettersSet = new Set(selectedLetters);

    const isActiveColumn = (index: number): boolean => {
      return letters.every(row => {
        if (row[0]?.hi === "や") {
          row = [row[0], null, row[1], null, row[2]] as ILetter[];
        }
        if (row[0]?.hi === "わ") {
          row = [row[0], null, null, null, row[1]] as ILetter[];
        }
        if (row[0]?.hi === "ん") {
          row = [null, null, row[0], null, null] as ILetter[];
        }

        const item = row[index];

        if (!item) return true;

        return selectedLettersSet.has(item?.id);
      });
    };

    const columns = letters[0]?.length || 0;
    const columnsList = Array.from({ length: columns }, (_, i) => isActiveColumn(i));

    const isActiveRow = (items: (ILetter)[]) => items.every(item => selectedLettersSet.has(item.id)
    );

    return letters.map(group => {
      const items = group.map((item, index) => {
        const commonFields = { data: item, column: columnsList[index], active: isActiveColumn(index) };
        return {
          ...commonFields,
          active: selectedLettersSet.has(item.id)
        };
      });

      return { activeInRow: isActiveRow(group), items };
    });
  }

  const onToggleLetter = useCallback(
    (letter: ILetter, alphabet: "base" | "dakuon" | "handakuon" | "yoon") => {
      dispatch(
        toggleLetter({
          letter: letter,
          alphabet,
          kana: kana,
        }),
      );
    },
    [dispatch, kana],
  );

  const onPress = useCallback(
    (
      val: [cell: ILetter, rowIndex: number, cellIndex: number, type: string],
    ) => {
      onToggleLetter(
        val[0],
        val[3] === "basic"
          ? "base"
          : (val[3] as "base" | "dakuon" | "handakuon" | "yoon"),
      );
    },
    [onToggleLetter],
  );

  const onToggleSome = useCallback(
    (
      letters: ILetter[],
      alphabet: "base" | "dakuon" | "handakuon" | "yoon",
    ) => {
      dispatch(
        toggleSome({
          letter: letters,
          alphabet,
          kana: kana,
        }),
      );
    },
    [dispatch, kana],
  );

  const onPlus = useCallback(
    (type: "row" | "cell", index: number, alphabet: Alphabet) => {
      const dataMap = {
        base: base,
        dakuon: dakuon,
        handakuon: handakuon,
        yoon: yoon,
      };

      const data = dataMap[alphabet] || [];

      const isILetter = (element: ILetter): element is ILetter => {
        return typeof element === "object";
      };

      const letters: ILetter[] =
        type === "row"
          ? (data[index].filter(isILetter) as ILetter[])
          : (data.flatMap((row) => {
            if (row[0]?.hi === "や") {
              row = [row[0], null, row[1], null, row[2]] as ILetter[];
            }
            if (row[0]?.hi === "わ") {
              row = [row[0], null, null, null, row[1]] as ILetter[];
            }
            if (row[0]?.hi === "ん") {
              row = [null, null, row[0], null, null] as ILetter[];
            }

            return (isILetter(row[index]) ? [row[index]] : []) as ILetter[]
        }))

      onToggleSome(letters.filter(letter => letter), alphabet);
    },
    [onToggleSome],
  );

  const letters = useMemo(
    () => getLettersWithStatuses(data, selectedLetters),
    [data, selectedLetters],
  );

  const getKanaSelected = () => {
    if (type === "base" && kana === KanaAlphabet.Hiragana) return KanaSection.BasicHiragana
    if (type === "base" && kana === KanaAlphabet.Katakana) return KanaSection.BasicKatakana
    if (type === "dakuon" && kana === KanaAlphabet.Hiragana) return KanaSection.DakuonHiragana
    if (type === "dakuon" && kana === KanaAlphabet.Katakana) return KanaSection.DakuonKatakana
    if (type === "handakuon" && kana === KanaAlphabet.Hiragana) return KanaSection.HandakuonHiragana
    if (type === "handakuon" && kana === KanaAlphabet.Katakana) return KanaSection.HandakuonKatakana
    if (type === "yoon" && kana === KanaAlphabet.Hiragana) return KanaSection.YoonHiragana
    if (type === "yoon" && kana === KanaAlphabet.Katakana) return KanaSection.YoonKatakana
  }
  
  const isKanaSelected = () => {
    const IS_BASIC_HIRAGANA = selected.base.hiragana.length === LETTERS_COUNT.basic;
    const IS_DAKUON_HIRAGANA = selected.dakuon.hiragana.length === LETTERS_COUNT.dakuon;
    const IS_HANDAKUON_HIRAGANA = selected.handakuon.hiragana.length === LETTERS_COUNT.handakuon;
    const IS_YOON_HIRAGANA = selected.yoon.hiragana.length === LETTERS_COUNT.yoon;

    const IS_BASIC_KATAKANA = selected.base.katakana.length === LETTERS_COUNT.basic;
    const IS_DAKUON_KATAKANA = selected.dakuon.katakana.length === LETTERS_COUNT.dakuon;
    const IS_HANDAKUON_KATAKANA = selected.handakuon.katakana.length === LETTERS_COUNT.handakuon;
    const IS_YOON_KATAKANA = selected.yoon.katakana.length === LETTERS_COUNT.yoon;


    if (type === "base" && kana === KanaAlphabet.Hiragana) return IS_BASIC_HIRAGANA;
    if (type === "base" && kana === KanaAlphabet.Katakana) return IS_BASIC_KATAKANA;
    if (type === "dakuon" && kana === KanaAlphabet.Hiragana) return IS_DAKUON_HIRAGANA;
    if (type === "dakuon" && kana === KanaAlphabet.Katakana) return IS_DAKUON_KATAKANA;
    if (type === "handakuon" && kana === KanaAlphabet.Hiragana) return IS_HANDAKUON_HIRAGANA;
    if (type === "handakuon" && kana === KanaAlphabet.Katakana) return IS_HANDAKUON_KATAKANA;
    if (type === "yoon" && kana === KanaAlphabet.Hiragana) return IS_YOON_HIRAGANA;
    if (type === "yoon" && kana === KanaAlphabet.Katakana) return IS_YOON_KATAKANA;
  }

  return (
    <View
      style={[
        styles.container,
        { borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.BorderDefault },
      ]}
    >
      {letters.length > 1 && (
        <View style={styles.rowButtons}>
          <Cell
            key={`selectAll`}
            isLong={false}
            widthDefault={itemWidth}
            widthLong={itemWidthLong}
            active={isKanaSelected()}
            kana={kana}
            cell={null}
            isPlus
            onPress={() => dispatch(setKanaSelected(getKanaSelected()))}
            isStartOfLine={!isKanaSelected() ? 
              <Icon name={"check-all"} size={18} color={colors.IconPrimary} /> :
              <Icon name={"close"} size={18} color={colors.IconPrimary} />
            }
          />

          {letters[0].items.map((cell, cellIndex) => {
            return (
              <Cell
                key={`${cellIndex}/plus`}
                isLong={type === 'yoon'}
                widthDefault={itemWidth}
                widthLong={itemWidthLong}
                active={cell.column}
                kana={kana}
                cell={null}
                isPlus
                onPress={() => onPlus?.("cell", cellIndex, type)}
                isStartOfLine={!cell.column ?
                  <Icon name={"plus"} size={18} color={colors.IconPrimary} /> :
                  <Icon name={"minus"} size={18} color={colors.IconPrimary} />
                }
              />
            );
          })}
        </View>
      )}

      <ScrollView>
        {letters.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={[styles.row, { marginTop: 10 }]}>
            <View style={styles.rowButtons}>
              <Cell
                key={`${rowIndex}/start_of_line`}
                isLong={false}
                widthDefault={itemWidth}
                widthLong={itemWidthLong}
                kana={kana}
                cell={null}
                isPlus
                onPress={() => onPlus?.("row", rowIndex, type)}
                active={row.activeInRow}
                isStartOfLine={!row.activeInRow ?
                  <Icon name={"plus"} size={18} color={colors.IconPrimary} /> :
                  <Icon name={"minus"} size={18} color={colors.IconPrimary} />
                }
              />
            </View>

            {((rowIndex === 7 && type === "base") ? [row.items[0], null, row.items[1], null, row.items[2]]
              : (rowIndex === 9 && type === "base") ? [row.items[0], null, null, null, row.items[1]]
                : (rowIndex == 10 && type === "base")  ? [null, null, row.items[0], null, null] 
                  : row.items
            ).map((cell, cellIndex) => {
              return (
                <Cell
                  key={`${rowIndex}/${cellIndex}`}
                  onPress={() =>
                    cell?.data &&
                    onPress?.([cell.data, rowIndex, cellIndex, type])
                  }
                  isLong={type === "yoon"}
                  widthDefault={itemWidth}
                  widthLong={itemWidthLong}
                  kana={kana}
                  cell={cell?.data}
                  active={cell?.active}
                />
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default EducationKanaTableSelected;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 16,
    marginBottom: 30,
    paddingBottom: 30,
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
  cell: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
  },
  symbol: {
    fontWeight: "400",
  },
});
