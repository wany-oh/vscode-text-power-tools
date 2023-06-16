"use strict";
import * as vscode from "vscode";
import { NumberArithmetic, NumeralSystem } from "./interfaces";
import { ASK_SPLIT_CHARACTER_FROM_USER, AffixTarget, Base4EncodingDirection, ChangeCaseType, ClipboardContentPasteType, FilterSourceType, FilterTarget, FilterType, InsertableSeries, InsertableStuff, LineNumberType, PadDirection, RemovedLineType, SortMethod, TextEncodingDirection, TextEncodingType, TextTransformationType, TrimDirection, ZalgificationIntensity, runAffixCommand, runBase64EncodingCommand, runChangeCaseCommand, runConvertNumberCommand, runConvertToZalgoCommand, runCopySelectionsToNewEditorCommand, runCountOccurrencesCommand, runExtractInfoCommand, runFilterTextCommand, runFormatContentAsTableCommand, runInsertLineNumbersCommand, runInsertNumbersCommand, runInsertPredefinedSeriesCommand as runInsertPredefinedSequenceCommand, runInsertStuffCommand, runJoinLinesCommand, runModifyTextEncodingCommand, runPadCommand, runPasteFromClipboardCommand, runRemoveControlCharactersCommand, runRemoveDuplicatesCommand, runRemoveLinesCommand, runRemoveNewLinesCommand, runRepeatSelectionContentCommand, runReplaceNewLinesAndWhitespaceWithASingleSpace, runReplaceWhitespaceWithASingleSpace, runSetTextSlotContentCommand, runSortCommand, runTextTransformationCommand, runTrimCommand, runpasteTextSlotCommand } from "./modules";

export function activate(context: vscode.ExtensionContext) {
	// Filter lines/extract info commands
	registerFilterLinesCommands(context);
	registerExtractInfoCommands(context);

	// Formatting, sorting commands
	registerPadCommands(context);
	registerSeparateWordsCommands(context);
	registerTrimCommands(context);
	registerFormatContentAsTableCommands(context);
	registerChangeLettersCommands(context);
	registerJoinCommands(context);
	registerSortCommands(context);

	// Insert data
	registerGenerateFakeDataCommands(context);
	registerInsertFactsCommands(context);
	registerInsertNumbersCommands(context);
	registerInsertLineNumbersCommands(context);
	registerInsertSeriesCommands(context);

	registerPasteCommands(context);
	registerTextSlotCommands(context);

	registerConverterCommands(context);
	registerIncreaseDecreaseCommands(context);
	registerEncoderCommands(context);

	registerSelectionCommands(context);

	registerRemoveCommands(context);
}

function registerFilterLinesCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.filterLinesIncludingString", () =>
		runFilterTextCommand(context, { filterType: FilterType.Include, sourceType: FilterSourceType.String, target: FilterTarget.CurrentEditor })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.filterLinesIncludingStringToNewEditor", () =>
		runFilterTextCommand(context, { filterType: FilterType.Include, sourceType: FilterSourceType.String, target: FilterTarget.NewEditor })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.copyLinesIncludingStringToClipboard", () =>
		runFilterTextCommand(context, { filterType: FilterType.Include, sourceType: FilterSourceType.String, target: FilterTarget.CopyToClipboard })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.cutLinesIncludingStringToClipboard", () =>
		runFilterTextCommand(context, { filterType: FilterType.Include, sourceType: FilterSourceType.String, target: FilterTarget.CutToClipboard })));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.filterLinesMatchingRegex", () =>
		runFilterTextCommand(context, { filterType: FilterType.Include, sourceType: FilterSourceType.Regex, target: FilterTarget.CurrentEditor })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.filterLinesMatchingRegexToNewEditor", () =>
		runFilterTextCommand(context, { filterType: FilterType.Include, sourceType: FilterSourceType.Regex, target: FilterTarget.NewEditor })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.copyLinesMatchingRegexToClipboard", () =>
		runFilterTextCommand(context, { filterType: FilterType.Include, sourceType: FilterSourceType.Regex, target: FilterTarget.CopyToClipboard })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.cutLinesMatchingRegexToClipboard", () =>
		runFilterTextCommand(context, { filterType: FilterType.Include, sourceType: FilterSourceType.Regex, target: FilterTarget.CutToClipboard })));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.filterLinesIncludingSelection", () =>
		runFilterTextCommand(context, { filterType: FilterType.Include, sourceType: FilterSourceType.Selection, target: FilterTarget.CurrentEditor })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.filterLinesIncludingSelectionToNewEditor", () =>
		runFilterTextCommand(context, { filterType: FilterType.Include, sourceType: FilterSourceType.Selection, target: FilterTarget.NewEditor })));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.filterLinesNotIncludingString", () =>
		runFilterTextCommand(context, { filterType: FilterType.Exclude, sourceType: FilterSourceType.String, target: FilterTarget.CurrentEditor })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.filterLinesNotIncludingStringToNewEditor", () =>
		runFilterTextCommand(context, { filterType: FilterType.Exclude, sourceType: FilterSourceType.String, target: FilterTarget.NewEditor })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.copyLinesNotIncludingStringToClipboard", () =>
		runFilterTextCommand(context, { filterType: FilterType.Exclude, sourceType: FilterSourceType.String, target: FilterTarget.CopyToClipboard })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.cutLinesNotIncludingStringToClipboard", () =>
		runFilterTextCommand(context, { filterType: FilterType.Exclude, sourceType: FilterSourceType.String, target: FilterTarget.CutToClipboard })));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.filterLinesNotMatchingRegex", () =>
		runFilterTextCommand(context, { filterType: FilterType.Exclude, sourceType: FilterSourceType.Regex, target: FilterTarget.CurrentEditor })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.filterLinesNotMatchingRegexToNewEditor", () =>
		runFilterTextCommand(context, { filterType: FilterType.Exclude, sourceType: FilterSourceType.Regex, target: FilterTarget.NewEditor })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.copyLinesNotMatchingRegexToClipboard", () =>
		runFilterTextCommand(context, { filterType: FilterType.Exclude, sourceType: FilterSourceType.Regex, target: FilterTarget.CopyToClipboard })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.cutLinesNotMatchingRegexToClipboard", () =>
		runFilterTextCommand(context, { filterType: FilterType.Exclude, sourceType: FilterSourceType.Regex, target: FilterTarget.CutToClipboard })));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.filterLinesNotIncludingSelection", () =>
		runFilterTextCommand(context, { filterType: FilterType.Exclude, sourceType: FilterSourceType.Selection, target: FilterTarget.CurrentEditor })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.filterLinesNotIncludingSelectionToNewEditor", () =>
		runFilterTextCommand(context, { filterType: FilterType.Exclude, sourceType: FilterSourceType.Selection, target: FilterTarget.NewEditor })));
}

function registerExtractInfoCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.extractInformation", () =>
		runExtractInfoCommand(context, { inNewEditor: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.extractInformationToNewEditor", () =>
		runExtractInfoCommand(context, { inNewEditor: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.countOccurrences", () =>
		runCountOccurrencesCommand({ inNewEditor: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.countOccurrencesToNewEditor", () =>
		runCountOccurrencesCommand({ inNewEditor: true })));
}

function registerPadCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.padStart", () =>
		runPadCommand({ direction: PadDirection.Start, askForPadCharacters: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.padStartWithCustomString", () =>
		runPadCommand({ direction: PadDirection.Start, askForPadCharacters: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.padEnd", () =>
		runPadCommand({ direction: PadDirection.End, askForPadCharacters: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.padEndWithCustomString", () =>
		runPadCommand({ direction: PadDirection.End, askForPadCharacters: true })));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.appendPrefixToAllLines", () =>
		runAffixCommand({ target: AffixTarget.Prefix })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.appendSuffixToAllLines", () =>
		runAffixCommand({ target: AffixTarget.Suffix })));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.wrapAllLinesWithTextSame", () =>
		runAffixCommand({ target: AffixTarget.Both })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.wrapAllLinesWithTextDifferent", () =>
		runAffixCommand({ target: AffixTarget.Wrap })));
}

function registerSeparateWordsCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.separateWordsWithSpaces", () =>
		runChangeCaseCommand({ type: ChangeCaseType.SeparateWithSpaces })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.separateWordsWithForwardSlashes", () =>
		runChangeCaseCommand({ type: ChangeCaseType.SeparateWithForwardSlashes })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.separateWordsWithBackslashes", () =>
		runChangeCaseCommand({ type: ChangeCaseType.SeparateWithBackslashes })));
}

function registerTrimCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.trimStart", () =>
		runTrimCommand({ direction: TrimDirection.Start })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.trim", () =>
		runTrimCommand({ direction: TrimDirection.Both })));
}

function registerFormatContentAsTableCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.formatContentAsTableByTabulator", () =>
		runFormatContentAsTableCommand({splitChar: "\t", padAlignChar: false})));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.formatContentAsTableBySemicolon", () =>
		runFormatContentAsTableCommand({splitChar: ";", padAlignChar: false})));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.formatContentAsTableByComma", () =>
		runFormatContentAsTableCommand({splitChar: ",", padAlignChar: false})));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.formatContentAsTableByPipe", () =>
		runFormatContentAsTableCommand({splitChar: "|", padAlignChar: false})));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.formatContentAsTableByCustomCharacter", () =>
		runFormatContentAsTableCommand({splitChar: ASK_SPLIT_CHARACTER_FROM_USER, padAlignChar: false})));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.formatContentAsTableBySemicolonWithPadding", () =>
		runFormatContentAsTableCommand({splitChar: ";", padAlignChar: true})));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.formatContentAsTableByPipeWithPadding", () =>
		runFormatContentAsTableCommand({splitChar: "|", padAlignChar: true})));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.formatContentAsTableByCustomCharacterWithPadding", () =>
		runFormatContentAsTableCommand({splitChar: ASK_SPLIT_CHARACTER_FROM_USER, padAlignChar: true})));
}

function registerChangeLettersCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeCaseToCamelCase", () =>
		runChangeCaseCommand({ type: ChangeCaseType.CamelCase })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeCaseToPascalCase", () =>
		runChangeCaseCommand({ type: ChangeCaseType.PascalCase })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeCaseToSnakeCase", () =>
		runChangeCaseCommand({ type: ChangeCaseType.SnakeCase })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeCaseToDashCase", () =>
		runChangeCaseCommand({ type: ChangeCaseType.DashCase })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeCaseToConstantCase", () =>
		runChangeCaseCommand({ type: ChangeCaseType.ConstantCase })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeCaseToDotCase", () =>
		runChangeCaseCommand({ type: ChangeCaseType.DotCase })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeCaseToTitleCase", () =>
		runChangeCaseCommand({ type: ChangeCaseType.TitleCase })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeCaseToSpongeCase", () =>
		runChangeCaseCommand({ type: ChangeCaseType.SpongeCase })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeCaseToSwapCase", () =>
		runChangeCaseCommand({ type: ChangeCaseType.SwapCase })));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.latinize", () =>
		runTextTransformationCommand({ type: TextTransformationType.Latinize })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.slugify", () =>
		runTextTransformationCommand({ type: TextTransformationType.Slugify })));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.unicodeNormalizationNFC", () =>
		runTextTransformationCommand({ type: TextTransformationType.UnicodeNormalizationNFC })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.unicodeNormalizationNFD", () =>
		runTextTransformationCommand({ type: TextTransformationType.UnicodeNormalizationNFD })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.unicodeNormalizationNFKC", () =>
		runTextTransformationCommand({ type: TextTransformationType.UnicodeNormalizationNFKC })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.unicodeNormalizationNFKD", () =>
		runTextTransformationCommand({ type: TextTransformationType.UnicodeNormalizationNFKD })));
}

function registerJoinCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.joinEvery2Lines", () =>
		runJoinLinesCommand({ joinString: "", numberOfJoinedLines: 2 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.joinEvery2LinesWithComma", () =>
		runJoinLinesCommand({ joinString: ",", numberOfJoinedLines: 2 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.joinEvery2LinesWithSemicolon", () =>
		runJoinLinesCommand({ joinString: ";", numberOfJoinedLines: 2 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.joinEvery2LinesWithPipe", () =>
		runJoinLinesCommand({ joinString: "|", numberOfJoinedLines: 2 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.joinEvery2LinesWithCustomString", () =>
		runJoinLinesCommand({ numberOfJoinedLines: 2 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.joinEveryNLines", () =>
		runJoinLinesCommand({ joinString: "" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.joinEveryNLinesWithComma", () =>
		runJoinLinesCommand({ joinString: "," })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.joinEveryNLinesWithSemicolon", () =>
		runJoinLinesCommand({ joinString: ";" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.joinEveryNLinesWithPipe", () =>
		runJoinLinesCommand({ joinString: "|" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.joinEveryNLinesWithCustomString", () =>
		runJoinLinesCommand({})));
}

function registerSortCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.caseSensitiveSortAscending", () =>
		runSortCommand({ sortMethod: SortMethod.CaseSensitive, sortDirection: "ascending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.caseSensitiveSortDescending", () =>
		runSortCommand({ sortMethod: SortMethod.CaseSensitive, sortDirection: "descending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.caseSensitiveSortAscendingAtColumn", () =>
		runSortCommand({ sortMethod: SortMethod.CaseSensitiveAtColumn, sortDirection: "ascending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.caseSensitiveSortDescendingAtColumn", () =>
		runSortCommand({ sortMethod: SortMethod.CaseSensitiveAtColumn, sortDirection: "descending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.caseInsensitiveSortAscendingAtColumn", () =>
		runSortCommand({ sortMethod: SortMethod.CaseInsensitiveAtColumn, sortDirection: "ascending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.caseInsensitiveSortDescendingAtColumn", () =>
		runSortCommand({ sortMethod: SortMethod.CaseInsensitiveAtColumn, sortDirection: "descending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.sortByLengthCaseSensitiveAscending", () =>
		runSortCommand({ sortMethod: SortMethod.LengthCaseSensitive, sortDirection: "ascending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.sortByLengthCaseSensitiveDescending", () =>
		runSortCommand({ sortMethod: SortMethod.LengthCaseSensitive, sortDirection: "descending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.sortByLengthCaseInsensitiveAscending", () =>
		runSortCommand({ sortMethod: SortMethod.LengthCaseInsensitive, sortDirection: "ascending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.sortByLengthCaseInsensitiveDescending", () =>
		runSortCommand({ sortMethod: SortMethod.LengthCaseInsensitive, sortDirection: "descending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.sortByWordCountAscending", () =>
		runSortCommand({ sortMethod: SortMethod.WordCount, sortDirection: "ascending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.sortByWordCountDescending", () =>
		runSortCommand({ sortMethod: SortMethod.WordCount, sortDirection: "descending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.sortByGraphemeCountAscending", () =>
		runSortCommand({ sortMethod: SortMethod.GraphemeCount, sortDirection: "ascending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.sortByGraphemeCountDescending", () =>
		runSortCommand({ sortMethod: SortMethod.GraphemeCount, sortDirection: "descending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.semverSortAscending", () =>
		runSortCommand({ sortMethod: SortMethod.Semver, sortDirection: "ascending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.semverSortDescending", () =>
		runSortCommand({ sortMethod: SortMethod.Semver, sortDirection: "descending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.ipAddressSortAscending", () =>
		runSortCommand({ sortMethod: SortMethod.IpAddress, sortDirection: "ascending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.ipAddressSortDescending", () =>
		runSortCommand({ sortMethod: SortMethod.IpAddress, sortDirection: "descending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.shuffleLines", () =>
		runSortCommand({ sortMethod: SortMethod.Shuffle, sortDirection: "ascending" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.reverseLines", () =>
		runSortCommand({ sortMethod: SortMethod.Reverse, sortDirection: "ascending" })));
}

function registerGenerateFakeDataCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.generateFakeData", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.UserSelectionOfFakeSeries })));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.generateRandomFromUserInput", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.RandomFromUserInput })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.generateRandomDecimalNumbersFromRange", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.RandomDecimalNumberFromRange })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.generateRandomHexadecimalNumbersFromRange", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.RandomHexadecimalNumberFromRange })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.generateRandomRealNumbersFromRange", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.RandomRealNumberFromRange })));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.generateRandomGuids", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.RandomGuids })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.generateRandomIpv4Addresses", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.RandomIpv4Addresses })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.generateRandomIpv6Addresses", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.RandomIpv6Addresses })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.generateLoremIpsumSentence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.LoremIpsumSentences })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.generateLoremIpsumParagraph", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.LoremIpsumParagraphs })));
}

function registerInsertFactsCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertFullFilePath", () =>
		runInsertStuffCommand({ what: InsertableStuff.FullFilePath })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertDirectoryPath", () =>
		runInsertStuffCommand({ what: InsertableStuff.DirectoryPath })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertFileName", () =>
		runInsertStuffCommand({ what: InsertableStuff.FileName })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertUnixTimestamp", () =>
		runInsertStuffCommand({ what: InsertableStuff.UnixTimestamp })));
}

function registerInsertNumbersCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertDecimalNumbers", () =>
		runInsertNumbersCommand({ numeralSystem: NumeralSystem.Decimal, askForIncrements: false, askForStartingNumber: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertDecimalNumbersStartingAt", () =>
		runInsertNumbersCommand({ numeralSystem: NumeralSystem.Decimal, askForIncrements: false, askForStartingNumber: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertDecimalNumbersWithIncrements", () =>
		runInsertNumbersCommand({ numeralSystem: NumeralSystem.Decimal, askForIncrements: true, askForStartingNumber: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertDecimalNumbersWithIncrementsStartingAt", () =>
		runInsertNumbersCommand({ numeralSystem: NumeralSystem.Decimal, askForIncrements: true, askForStartingNumber: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertHexNumbers", () =>
		runInsertNumbersCommand({ numeralSystem: NumeralSystem.Hexadecimal, askForIncrements: false, askForStartingNumber: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertHexNumbersStartingAt", () =>
		runInsertNumbersCommand({ numeralSystem: NumeralSystem.Hexadecimal, askForIncrements: false, askForStartingNumber: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertHexNumbersWithIncrements", () =>
		runInsertNumbersCommand({ numeralSystem: NumeralSystem.Hexadecimal, askForIncrements: true, askForStartingNumber: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertHexNumbersWithIncrementsStartingAt", () =>
		runInsertNumbersCommand({ numeralSystem: NumeralSystem.Hexadecimal, askForIncrements: true, askForStartingNumber: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertRomanNumerals", () =>
		runInsertNumbersCommand({ numeralSystem: NumeralSystem.Roman, askForIncrements: false, askForStartingNumber: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertRomanNumeralsStartingAt", () =>
		runInsertNumbersCommand({ numeralSystem: NumeralSystem.Roman, askForIncrements: false, askForStartingNumber: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertRomanNumeralsWithIncrements", () =>
		runInsertNumbersCommand({ numeralSystem: NumeralSystem.Roman, askForIncrements: true, askForStartingNumber: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertRomanNumeralsWithIncrementsStartingAt", () =>
		runInsertNumbersCommand({ numeralSystem: NumeralSystem.Roman, askForIncrements: true, askForStartingNumber: true })));
}

function registerInsertLineNumbersCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertLineNumbers", () =>
		runInsertLineNumbersCommand({ type: LineNumberType.Real, padWithZero: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertLineNumbersFixedLength", () =>
		runInsertLineNumbersCommand({ type: LineNumberType.Real, padWithZero: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertRelativeLineNumbers", () =>
		runInsertLineNumbersCommand({ type: LineNumberType.Relative, padWithZero: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertRelativeLineNumbersFixedLength", () =>
		runInsertLineNumbersCommand({ type: LineNumberType.Relative, padWithZero: true })));
}

function registerInsertSeriesCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.UserSelectionOfStandardSeries })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertLowercaseLetterSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.LowercaseLetters })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertUppercaseLetterSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.UppercaseLetters })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertLowercaseGreekLetterSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.LowercaseGreekLetters })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertUppercaseGreekLetterSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.UppercaseGreekLetters })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertNatoPhoneticAlphabetSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.NatoPhoneticAlphabet })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertLongEnglishMonthNamesSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.LongEnglishMonthNames })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertShortEnglishMonthNamesSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.ShortEnglishMonthNames })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertLongLocaleMonthNamesSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.LongLocaleMonthNames })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertShortLocaleMonthNamesSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.ShortLocaleMonthNames })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertLongEnglishDayNamesSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.LongEnglishDayNames })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertShortEnglishDayNamesSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.ShortEnglishDayNames })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertLongLocaleDayNamesSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.LongLocaleDayNames })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.insertShortLocaleDayNamesSequence", () =>
		runInsertPredefinedSequenceCommand(context, { series: InsertableSeries.ShortLocaleDayNames })));
}

function registerPasteCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.spreadPasteFromClipboard", () =>
		runPasteFromClipboardCommand({ type: ClipboardContentPasteType.Spread, skipEmpty: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.spreadPasteFromClipboardSkipEmpty", () =>
		runPasteFromClipboardCommand({ type: ClipboardContentPasteType.Spread, skipEmpty: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.spreadPasteRepeatedlyFromClipboard", () =>
		runPasteFromClipboardCommand({ type: ClipboardContentPasteType.SpreadRepeatedly, skipEmpty: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.spreadPasteRepeatedlyFromClipboardSkipEmpty", () =>
		runPasteFromClipboardCommand({ type: ClipboardContentPasteType.SpreadRepeatedly, skipEmpty: true })));
}

function registerTextSlotCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.pasteTextSlot1Content", () =>
		runpasteTextSlotCommand(context, { slotId: 1 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.pasteTextSlot2Content", () =>
		runpasteTextSlotCommand(context, { slotId: 2 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.pasteTextSlot3Content", () =>
		runpasteTextSlotCommand(context, { slotId: 3 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.pasteTextSlot4Content", () =>
		runpasteTextSlotCommand(context, { slotId: 4 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.pasteTextSlot5Content", () =>
		runpasteTextSlotCommand(context, { slotId: 5 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.setTextSlot1Content", () =>
		runSetTextSlotContentCommand(context, { slotId: 1 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.setTextSlot2Content", () =>
		runSetTextSlotContentCommand(context, { slotId: 2 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.setTextSlot3Content", () =>
		runSetTextSlotContentCommand(context, { slotId: 3 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.setTextSlot4Content", () =>
		runSetTextSlotContentCommand(context, { slotId: 4 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.setTextSlot5Content", () =>
		runSetTextSlotContentCommand(context, { slotId: 5 })));
}

function registerConverterCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertHexadecimalNumbersToDecimal", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Decimal })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertHexadecimalNumbersToDecimal8bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Decimal, arithmetic: NumberArithmetic.EightBit })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertHexadecimalNumbersToDecimal16bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Decimal, arithmetic: NumberArithmetic.SixteenBit })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertHexadecimalNumbersToDecimal32bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Decimal, arithmetic: NumberArithmetic.ThirtyTwoBit })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertHexadecimalNumbersToDecimal64bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Decimal, arithmetic: NumberArithmetic.SixtyFourBit })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertDecimalNumbersToHexadecimal", () =>
		runConvertNumberCommand({ source: NumeralSystem.Decimal, target: NumeralSystem.Hexadecimal })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertDecimalNumbersToHexadecimal8bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Decimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.EightBit })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertDecimalNumbersToHexadecimal16bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Decimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.SixteenBit })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertDecimalNumbersToHexadecimal32bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Decimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.ThirtyTwoBit })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertDecimalNumbersToHexadecimal64bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Decimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.SixtyFourBit })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertToZalgoUltraLight", () =>
		runConvertToZalgoCommand({ intensity: ZalgificationIntensity.UltraLight })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertToZalgoLight", () =>
		runConvertToZalgoCommand({ intensity: ZalgificationIntensity.Light })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertToZalgoMedium", () =>
		runConvertToZalgoCommand({ intensity: ZalgificationIntensity.Medium })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertToZalgoHeavy", () =>
		runConvertToZalgoCommand({ intensity: ZalgificationIntensity.Heavy })));
}

function registerIncreaseDecreaseCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.increaseDecimalNumbersWithOne", () =>
		runConvertNumberCommand({ source: NumeralSystem.Decimal, target: NumeralSystem.Decimal, increment: 1n })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.increaseHexNumbersWithOne", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, increment: 1n })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.increaseHexNumbersWithOne8bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.EightBit, increment: 1n })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.increaseHexNumbersWithOne16bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.SixteenBit, increment: 1n })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.increaseHexNumbersWithOne32bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.ThirtyTwoBit, increment: 1n })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.increaseHexNumbersWithOne64bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.SixtyFourBit, increment: 1n })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.decreaseDecimalNumbersWithOne", () =>
		runConvertNumberCommand({ source: NumeralSystem.Decimal, target: NumeralSystem.Decimal, increment: -1n })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.decreaseHexNumbersWithOne", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, increment: -1n })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.decreaseHexNumbersWithOne8bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.EightBit, increment: -1n })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.decreaseHexNumbersWithOne16bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.SixteenBit, increment: -1n })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.decreaseHexNumbersWithOne32bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.ThirtyTwoBit, increment: -1n })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.decreaseHexNumbersWithOne64bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.SixtyFourBit, increment: -1n })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeDecimalNumbersWithIncrement", () =>
		runConvertNumberCommand({ source: NumeralSystem.Decimal, target: NumeralSystem.Decimal, increment: "ask" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeHexNumbersWithIncrement", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, increment: "ask" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeHexNumbersWithIncrement8bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.EightBit, increment: "ask" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeHexNumbersWithIncrement16bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.SixteenBit, increment: "ask" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeHexNumbersWithIncrement32bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.ThirtyTwoBit, increment: "ask" })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.changeHexNumbersWithIncrement64bit", () =>
		runConvertNumberCommand({ source: NumeralSystem.Hexadecimal, target: NumeralSystem.Hexadecimal, arithmetic: NumberArithmetic.SixtyFourBit, increment: "ask" })));
}

function registerEncoderCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.urlEncodeText", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.UrlEncoding, direction: TextEncodingDirection.Encode, onEachLine: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.urlEncodeTextOnEachLine", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.UrlEncoding, direction: TextEncodingDirection.Encode, onEachLine: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.urlDecodeText", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.UrlEncoding, direction: TextEncodingDirection.Decode, onEachLine: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.encodeHtmlEntities", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.HtmlEntityEncoding, direction: TextEncodingDirection.Encode, onEachLine: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.encodeHtmlEntitiesOnEachLine", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.HtmlEntityEncoding, direction: TextEncodingDirection.Encode, onEachLine: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.encodeHtmlEntitiesWithNonAscii", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.HtmlEntityEncodingWithNonAscii, direction: TextEncodingDirection.Encode, onEachLine: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.encodeHtmlEntitiesWithNonAsciiOnEachLine", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.HtmlEntityEncodingWithNonAscii, direction: TextEncodingDirection.Encode, onEachLine: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.decodeHtmlEntities", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.HtmlEntityEncoding, direction: TextEncodingDirection.Decode, onEachLine: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.encodeXmlEntities", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.XmlEntityEncoding, direction: TextEncodingDirection.Encode, onEachLine: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.encodeXmlEntitiesOnEachLine", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.XmlEntityEncoding, direction: TextEncodingDirection.Encode, onEachLine: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.decodeXmlEntities", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.XmlEntityEncoding, direction: TextEncodingDirection.Decode, onEachLine: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.escapeTextForJson", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.Json, direction: TextEncodingDirection.Encode, onEachLine: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.unescapeTextForJson", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.Json, direction: TextEncodingDirection.Decode, onEachLine: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertToJsonString", () =>
		runTextTransformationCommand({ type: TextTransformationType.JsonString })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.convertToUnicodeEscapeSequences", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.UnicodeEscapeSequences, direction: TextEncodingDirection.Encode, onEachLine: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.decodeUnicodeEscapeSequences", () =>
		runModifyTextEncodingCommand({ type: TextEncodingType.UnicodeEscapeSequences, direction: TextEncodingDirection.Decode, onEachLine: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.base64EncodeText", () =>
		runBase64EncodingCommand({ direction: Base4EncodingDirection.Encode, onEachLine: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.base64EncodeTextOnEachLine", () =>
		runBase64EncodingCommand({ direction: Base4EncodingDirection.Encode, onEachLine: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.base64DecodeText", () =>
		runBase64EncodingCommand({ direction: Base4EncodingDirection.Decode, onEachLine: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.base64DecodeTextOnEachLine", () =>
		runBase64EncodingCommand({ direction: Base4EncodingDirection.Decode, onEachLine: true })));
}

function registerSelectionCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.duplicateSelectionContent", () =>
		runRepeatSelectionContentCommand({ repeatCount: 2 })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.repeatSelectionContent", () =>
		runRepeatSelectionContentCommand()));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.copySelectionsToNewEditor", () =>
		runCopySelectionsToNewEditorCommand()));
}

function registerRemoveCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.removeWhitespaceCharacters", () =>
		runTextTransformationCommand({ type: TextTransformationType.RemoveWhitespace })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.removeNewLines", () =>
		runRemoveNewLinesCommand({ trimWhitespace: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.trimAndRemoveNewLines", () =>
		runRemoveNewLinesCommand({ trimWhitespace: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.replaceWhitespaceWithASingleSpace", () =>
		runReplaceWhitespaceWithASingleSpace()));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.replaceNewLinesAndWhitespaceWithASingleSpace", () =>
		runReplaceNewLinesAndWhitespaceWithASingleSpace()));

	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.removeDuplicates", () =>
		runRemoveDuplicatesCommand()));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.removeEmptyLines", () =>
		runRemoveLinesCommand({ type: RemovedLineType.Empty, onlySurplus: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.removeSurplusEmptyLines", () =>
		runRemoveLinesCommand({ type: RemovedLineType.Empty, onlySurplus: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.removeBlankLines", () =>
		runRemoveLinesCommand({ type: RemovedLineType.Blank, onlySurplus: false })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.removeSurplusBlankLines", () =>
		runRemoveLinesCommand({ type: RemovedLineType.Blank, onlySurplus: true })));
	context.subscriptions.push(vscode.commands.registerCommand("textPowerTools.removeControlCharacters", () =>
		runRemoveControlCharactersCommand()));
}

// this method is called when your extension is deactivated
export function deactivate() {
}
