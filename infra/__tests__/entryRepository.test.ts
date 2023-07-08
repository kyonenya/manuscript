import { equal, deepEqual } from 'node:assert/strict';
import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import { parseISO, subMinutes, addSeconds, subSeconds } from 'date-fns';
import { newEntry } from '../../domain/Entry';
import * as entryRepository from '../entryRepository';

describe('Query:entriesRepository', () => {
  const entry1 = newEntry({
    text: 'これは最新の記事です。',
    createdAt: new Date().toISOString(),
    tags: ['タグ1'],
  });
  const entry2 = newEntry({
    text: 'これは一つ前の記事です。',
    tags: ['タグ1', 'タグ2'],
    createdAt: subMinutes(new Date(), 1).toISOString(),
  });
  const entry3 = newEntry({
    text: 'これは二つ前の記事です。',
    tags: ['タグ1', 'タグ2', 'タグ3'],
    createdAt: subMinutes(new Date(), 2).toISOString(),
  });

  before(async () => {
    await entryRepository.deleteAll();
    await entryRepository.createOne({ entry: entry1 });
    await entryRepository.createOne({ entry: entry2 });
  });

  it('readMany', async () => {
    const entries = await entryRepository.readMany({ limit: 1, offset: 1 });
    equal(entries.length, 1);
    equal(entries[0].text, entry2.text);
  });
  it('readMany:offset', async () => {
    const entries = await entryRepository.readMany({
      keyword: '。',
      limit: 1,
      offset: 1,
    });
    equal(entries.length, 1);
    equal(entries[0].text, entry2.text);
    deepEqual(entries[0].tags, entry2.tags);
  });
  it('readMany:emptyKeyword', async () => {
    const entries = await entryRepository.readMany({
      keyword: '',
      limit: 1,
    });
    // same as readMany
    equal(entries[0].text, entry1.text);
  });
  it('readMany:tag', async () => {
    const entries = await entryRepository.readMany({
      tag: 'タグ1',
      limit: 1,
    });
    equal(entries[0].text, entry1.text);
  });
  it('readMany:keyword+tag', async () => {
    const entries = await entryRepository.readMany({
      tag: 'タグ1',
      keyword: '一つ前',
      limit: 1,
    });
    equal(entries[0].text, entry2.text);
  });
  it('readMany:since+until', async () => {
    const entries = await entryRepository.readMany({
      since: addSeconds(parseISO(entry3.createdAt), 1).toISOString(),
      until: subSeconds(parseISO(entry1.createdAt), 1).toISOString(),
      limit: 3,
    });
    equal(entries.length, 1);
    equal(entries[0].text, entry2.text);
  });

  it('readOne', async () => {
    const entry = await entryRepository.readOne({ uuid: entry1.uuid });
    equal(entry?.text, entry1.text);
  });
  it('readOne:empty', async () => {
    const result = await entryRepository.readOne({
      uuid: 'thisisadummyuuidthisisadummyuuid',
    });
    equal(result, undefined);
  });

  it('readTagList', async () => {
    const tags = await entryRepository.readTagList();
    deepEqual(tags, ['タグ1', 'タグ2']);
  });

  after(async () => await entryRepository.deleteAll());
});

describe('Mutation:entriesRepository', () => {
  beforeEach(async () => await entryRepository.deleteAll());

  it('createOne', async () => {
    const entry = newEntry({
      text: 'これはサンプルの記事です。',
      tags: ['タグ1', 'タグ2'],
    });
    await entryRepository.createOne({ entry });
    const readResult = await entryRepository.readOne({ uuid: entry.uuid });
    equal(readResult?.text, entry.text);
    deepEqual(readResult?.tags, entry.tags);
  });

  it('createMany', async () => {
    const entry1 = newEntry({
      text: 'これは１つ目の記事です。',
      tags: ['タグ1'],
    });
    const entry2 = newEntry({
      text: 'これは２つ目の記事です。',
      tags: ['タグ1', 'タグ2', 'タグ3'],
      createdAt: subMinutes(new Date(), 1).toISOString(),
    });
    await entryRepository.createMany({
      entries: [entry1, entry2],
    });
    const entries = await entryRepository.readMany({ limit: 2 });
    deepEqual(entries, [entry1, entry2]);
  });

  it('updateOne', async () => {
    const oldEntry = newEntry({
      text: 'これはサンプルの記事です。',
      tags: ['タグ1', 'タグ2'],
    });
    const updatedEntry = newEntry({
      text: 'これは更新された記事です。',
      tags: ['新しいタグ1', '新しいタグ2'],
      uuid: oldEntry.uuid,
    });

    await entryRepository.createOne({ entry: oldEntry });
    const resultEntry = await entryRepository.updateOne({
      entry: updatedEntry,
    });
    equal(resultEntry?.text, updatedEntry.text);
    deepEqual(resultEntry?.tags, updatedEntry.tags);
  });

  it('deleteOne', async () => {
    const entry = newEntry({
      text: 'これはサンプルの記事です。',
      tags: ['タグ1', 'タグ2'],
    });
    await entryRepository.createOne({ entry });
    await entryRepository.deleteOne({ uuid: entry.uuid });
    const resultEntry = await entryRepository.readOne({ uuid: entry.uuid });
    equal(resultEntry, undefined);
  });

  it('deleteAll', async () => {
    const entry1 = newEntry({
      text: 'これは１つ目の記事です。',
      tags: ['タグ1'],
      createdAt: subMinutes(new Date(), 1).toISOString(),
    });
    const entry2 = newEntry({
      text: 'これは２つ目の記事です。',
      tags: ['タグ1', 'タグ2', 'タグ3'],
    });
    await entryRepository.createOne({ entry: entry1 });
    await entryRepository.createOne({ entry: entry2 });
    await entryRepository.deleteAll();
    const entries = await entryRepository.readMany({ limit: 2 });
    equal(entries.length, 0);
  });

  afterEach(async () => {
    await entryRepository.deleteAll();
  });
});
