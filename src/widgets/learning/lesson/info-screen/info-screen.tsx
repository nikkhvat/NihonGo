import React from "react";

import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  AnyBlock,
  InfoLessonScreen,
  LetterBlock,
  MathAnswerBlock,
  RulesBlock,
  SelectAnswerBlock,
  SequenceBlock,
  TableBlock,
  TextBlock,
} from "@/shared/constants/lessons";
import BorderLetter from "@/entities/education/letter/borderLetter/borderLetter";
import Rules from "@/entities/education/rules/rules";
import SelectAnswer from "@/entities/education/select-answer/select-answer";
import Sequence from "@/entities/education/sequence";
import Table from "@/shared/ui/table/table";
import BlockText from "@/entities/education/text/text";
import { KanaAlphabet } from "@/shared/constants/kana";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import MatchPairs from "@/entities/education/practice/match-pairs/match-pairs";
import { LearningTitle } from "../ui/title";

type InfoScreenProps = InfoLessonScreen & {
  next: () => void;
  finish: () => void;

  isLast?: boolean;
};

const blockType = {
  isText: (item: AnyBlock): item is TextBlock => "text" in item,
  isTable: (item: AnyBlock): item is TableBlock => "table" in item,
  isRules: (item: AnyBlock): item is RulesBlock => "rules" in item,
  isLetter: (item: AnyBlock): item is LetterBlock => "kana" in item,
  isSelectAnswer: (item: AnyBlock): item is SelectAnswerBlock =>
    "answers" in item,
  isMatchAnswerBlock: (item: AnyBlock): item is MathAnswerBlock =>
    "pairs" in item,
  isSequence: (item: AnyBlock): item is SequenceBlock => "sequence" in item,
};

const InfoScreen: React.FC<InfoScreenProps> = ({
  next,
  finish,
  title,
  blocks,
  isLast,
}) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const interactiveBlocks = blocks.filter(
    (item) =>
      blockType.isSelectAnswer(item) ||
      blockType.isMatchAnswerBlock(item) ||
      blockType.isSequence(item),
  );

  function checkUnknown(arg: never): never {
    throw new Error(`not all blocks are processed: ${arg}`);
  }

  const nextScreen = () => {
    if (isLast && interactiveBlocks.length) {
      finish();
    } else {
      next();
    }
  };

  const getButtons = () => {
    if (interactiveBlocks.length) return <View></View>;

    return (
      <View
        style={[
          styles.btnsContainer,
          {
            paddingLeft: insets.left + 20,
            paddingRight: insets.right + 20,
          },
        ]}
      >
        {!isLast && (
          <PrimaryButton
            isFullWidth
            text={t("common.next")}
            onClick={nextScreen}
          />
        )}
        {isLast && (
          <PrimaryButton
            isFullWidth
            text={t("common.complete")}
            onClick={finish}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 22,
          paddingBottom: 22,
        }}
        style={{
          paddingLeft: insets.left + 20,
          paddingRight: insets.right + 20,
          width: "100%",
        }}
      >
        <LearningTitle>{title}</LearningTitle>

        <View style={styles.blocks}>
          {blocks.map((block, idx) => {
            if (blockType.isText(block)) {
              return <BlockText text={block.text} key={idx} />;
            } else if (blockType.isTable(block)) {
              return <Table key={idx} data={block.table} />;
            } else if (blockType.isRules(block)) {
              return <Rules key={idx} rules={block.rules} />;
            } else if (blockType.isLetter(block)) {
              const blockKana =
                block?.kana === "hiragana"
                  ? KanaAlphabet.Hiragana
                  : KanaAlphabet.Katakana;

              return <BorderLetter kana={blockKana} key={idx} id={block.id} />;
            } else if (blockType.isSelectAnswer(block)) {
              return (
                <SelectAnswer
                  key={idx}
                  onFinish={nextScreen}
                  answers={block.answers}
                />
              );
            } else if (blockType.isMatchAnswerBlock(block)) {
              return (
                <MatchPairs
                  onComplete={nextScreen}
                  pairs={block.pairs}
                  key={idx}
                />
              );
            } else if (blockType.isSequence(block)) {
              return (
                <Sequence
                  onFinish={nextScreen}
                  sequence={block.sequence}
                  key={idx}
                />
              );
            } else {
              checkUnknown(block);
            }
          })}
        </View>
      </ScrollView>
      {getButtons()}
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  btnsContainer: {
    width: "100%",
    height: 66,
    paddingTop: 16
  },

  blocks: {
    gap: 16,
  },
});
