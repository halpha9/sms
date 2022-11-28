// @ts-nocheck
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  requestHeaders?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    await client.request({
      document: query,
      variables,
      requestHeaders
    });
}
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export interface Int_Comparison_Exp {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export interface String_Comparison_Exp {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
}

/** columns and relationships of "chat_member" */
export interface Chat_Member {
  __typename?: 'chat_member';
  created_at: Scalars['timestamptz'];
  group_id: Scalars['uuid'];
  id: Scalars['uuid'];
  join_at?: Maybe<Scalars['timestamptz']>;
  left_at?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  messages_sent: Message[];
  /** An aggregate relationship */
  messages_sent_aggregate: Message_Aggregate;
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user?: Maybe<User>;
  user_id: Scalars['uuid'];
}

/** columns and relationships of "chat_member" */
export interface Chat_MemberMessages_SentArgs {
  distinct_on?: InputMaybe<Message_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Message_Order_By[]>;
  where?: InputMaybe<Message_Bool_Exp>;
}

/** columns and relationships of "chat_member" */
export interface Chat_MemberMessages_Sent_AggregateArgs {
  distinct_on?: InputMaybe<Message_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Message_Order_By[]>;
  where?: InputMaybe<Message_Bool_Exp>;
}

/** aggregated selection of "chat_member" */
export interface Chat_Member_Aggregate {
  __typename?: 'chat_member_aggregate';
  aggregate?: Maybe<Chat_Member_Aggregate_Fields>;
  nodes: Chat_Member[];
}

export interface Chat_Member_Aggregate_Bool_Exp {
  count?: InputMaybe<Chat_Member_Aggregate_Bool_Exp_Count>;
}

export interface Chat_Member_Aggregate_Bool_Exp_Count {
  arguments?: InputMaybe<Chat_Member_Select_Column[]>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Chat_Member_Bool_Exp>;
  predicate: Int_Comparison_Exp;
}

/** aggregate fields of "chat_member" */
export interface Chat_Member_Aggregate_Fields {
  __typename?: 'chat_member_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Chat_Member_Max_Fields>;
  min?: Maybe<Chat_Member_Min_Fields>;
}

/** aggregate fields of "chat_member" */
export interface Chat_Member_Aggregate_FieldsCountArgs {
  columns?: InputMaybe<Chat_Member_Select_Column[]>;
  distinct?: InputMaybe<Scalars['Boolean']>;
}

/** order by aggregate values of table "chat_member" */
export interface Chat_Member_Aggregate_Order_By {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Chat_Member_Max_Order_By>;
  min?: InputMaybe<Chat_Member_Min_Order_By>;
}

/** input type for inserting array relation for remote table "chat_member" */
export interface Chat_Member_Arr_Rel_Insert_Input {
  data: Chat_Member_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Chat_Member_On_Conflict>;
}

/** Boolean expression to filter rows from the table "chat_member". All fields are combined with a logical 'AND'. */
export interface Chat_Member_Bool_Exp {
  _and?: InputMaybe<Chat_Member_Bool_Exp[]>;
  _not?: InputMaybe<Chat_Member_Bool_Exp>;
  _or?: InputMaybe<Chat_Member_Bool_Exp[]>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  group_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  join_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  left_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  messages_sent?: InputMaybe<Message_Bool_Exp>;
  messages_sent_aggregate?: InputMaybe<Message_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
}

/** unique or primary key constraints on table "chat_member" */
export enum Chat_Member_Constraint {
  /** unique or primary key constraint on columns "id" */
  ChatMemberPkey = 'chat_member_pkey'
}

/** input type for inserting data into table "chat_member" */
export interface Chat_Member_Insert_Input {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  group_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  join_at?: InputMaybe<Scalars['timestamptz']>;
  left_at?: InputMaybe<Scalars['timestamptz']>;
  messages_sent?: InputMaybe<Message_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']>;
}

/** aggregate max on columns */
export interface Chat_Member_Max_Fields {
  __typename?: 'chat_member_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  group_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  join_at?: Maybe<Scalars['timestamptz']>;
  left_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
}

/** order by max() on columns of table "chat_member" */
export interface Chat_Member_Max_Order_By {
  created_at?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  join_at?: InputMaybe<Order_By>;
  left_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
}

/** aggregate min on columns */
export interface Chat_Member_Min_Fields {
  __typename?: 'chat_member_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  group_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  join_at?: Maybe<Scalars['timestamptz']>;
  left_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
}

/** order by min() on columns of table "chat_member" */
export interface Chat_Member_Min_Order_By {
  created_at?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  join_at?: InputMaybe<Order_By>;
  left_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
}

/** response of any mutation on the table "chat_member" */
export interface Chat_Member_Mutation_Response {
  __typename?: 'chat_member_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Chat_Member[];
}

/** on_conflict condition type for table "chat_member" */
export interface Chat_Member_On_Conflict {
  constraint: Chat_Member_Constraint;
  update_columns?: Chat_Member_Update_Column[];
  where?: InputMaybe<Chat_Member_Bool_Exp>;
}

/** Ordering options when selecting data from "chat_member". */
export interface Chat_Member_Order_By {
  created_at?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  join_at?: InputMaybe<Order_By>;
  left_at?: InputMaybe<Order_By>;
  messages_sent_aggregate?: InputMaybe<Message_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
}

/** primary key columns input for table: chat_member */
export interface Chat_Member_Pk_Columns_Input {
  id: Scalars['uuid'];
}

/** select columns of table "chat_member" */
export enum Chat_Member_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  JoinAt = 'join_at',
  /** column name */
  LeftAt = 'left_at',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "chat_member" */
export interface Chat_Member_Set_Input {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  group_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  join_at?: InputMaybe<Scalars['timestamptz']>;
  left_at?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['uuid']>;
}

/** Streaming cursor of the table "chat_member" */
export interface Chat_Member_Stream_Cursor_Input {
  /** Stream column input with initial value */
  initial_value: Chat_Member_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface Chat_Member_Stream_Cursor_Value_Input {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  group_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  join_at?: InputMaybe<Scalars['timestamptz']>;
  left_at?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['uuid']>;
}

/** update columns of table "chat_member" */
export enum Chat_Member_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  JoinAt = 'join_at',
  /** column name */
  LeftAt = 'left_at',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export interface Chat_Member_Updates {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Chat_Member_Set_Input>;
  where: Chat_Member_Bool_Exp;
}

/** columns and relationships of "chat_session" */
export interface Chat_Session {
  __typename?: 'chat_session';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An array relationship */
  members: Chat_Member[];
  /** An aggregate relationship */
  members_aggregate: Chat_Member_Aggregate;
  /** An array relationship */
  messages: Message[];
  /** An aggregate relationship */
  messages_aggregate: Message_Aggregate;
  updated_at: Scalars['timestamptz'];
}

/** columns and relationships of "chat_session" */
export interface Chat_SessionMembersArgs {
  distinct_on?: InputMaybe<Chat_Member_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Chat_Member_Order_By[]>;
  where?: InputMaybe<Chat_Member_Bool_Exp>;
}

/** columns and relationships of "chat_session" */
export interface Chat_SessionMembers_AggregateArgs {
  distinct_on?: InputMaybe<Chat_Member_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Chat_Member_Order_By[]>;
  where?: InputMaybe<Chat_Member_Bool_Exp>;
}

/** columns and relationships of "chat_session" */
export interface Chat_SessionMessagesArgs {
  distinct_on?: InputMaybe<Message_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Message_Order_By[]>;
  where?: InputMaybe<Message_Bool_Exp>;
}

/** columns and relationships of "chat_session" */
export interface Chat_SessionMessages_AggregateArgs {
  distinct_on?: InputMaybe<Message_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Message_Order_By[]>;
  where?: InputMaybe<Message_Bool_Exp>;
}

/** aggregated selection of "chat_session" */
export interface Chat_Session_Aggregate {
  __typename?: 'chat_session_aggregate';
  aggregate?: Maybe<Chat_Session_Aggregate_Fields>;
  nodes: Chat_Session[];
}

/** aggregate fields of "chat_session" */
export interface Chat_Session_Aggregate_Fields {
  __typename?: 'chat_session_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Chat_Session_Max_Fields>;
  min?: Maybe<Chat_Session_Min_Fields>;
}

/** aggregate fields of "chat_session" */
export interface Chat_Session_Aggregate_FieldsCountArgs {
  columns?: InputMaybe<Chat_Session_Select_Column[]>;
  distinct?: InputMaybe<Scalars['Boolean']>;
}

/** Boolean expression to filter rows from the table "chat_session". All fields are combined with a logical 'AND'. */
export interface Chat_Session_Bool_Exp {
  _and?: InputMaybe<Chat_Session_Bool_Exp[]>;
  _not?: InputMaybe<Chat_Session_Bool_Exp>;
  _or?: InputMaybe<Chat_Session_Bool_Exp[]>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  members?: InputMaybe<Chat_Member_Bool_Exp>;
  members_aggregate?: InputMaybe<Chat_Member_Aggregate_Bool_Exp>;
  messages?: InputMaybe<Message_Bool_Exp>;
  messages_aggregate?: InputMaybe<Message_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
}

/** unique or primary key constraints on table "chat_session" */
export enum Chat_Session_Constraint {
  /** unique or primary key constraint on columns "id" */
  ChatSessionPkey = 'chat_session_pkey'
}

/** input type for inserting data into table "chat_session" */
export interface Chat_Session_Insert_Input {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  members?: InputMaybe<Chat_Member_Arr_Rel_Insert_Input>;
  messages?: InputMaybe<Message_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
}

/** aggregate max on columns */
export interface Chat_Session_Max_Fields {
  __typename?: 'chat_session_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
}

/** aggregate min on columns */
export interface Chat_Session_Min_Fields {
  __typename?: 'chat_session_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
}

/** response of any mutation on the table "chat_session" */
export interface Chat_Session_Mutation_Response {
  __typename?: 'chat_session_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Chat_Session[];
}

/** on_conflict condition type for table "chat_session" */
export interface Chat_Session_On_Conflict {
  constraint: Chat_Session_Constraint;
  update_columns?: Chat_Session_Update_Column[];
  where?: InputMaybe<Chat_Session_Bool_Exp>;
}

/** Ordering options when selecting data from "chat_session". */
export interface Chat_Session_Order_By {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  members_aggregate?: InputMaybe<Chat_Member_Aggregate_Order_By>;
  messages_aggregate?: InputMaybe<Message_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
}

/** primary key columns input for table: chat_session */
export interface Chat_Session_Pk_Columns_Input {
  id: Scalars['uuid'];
}

/** select columns of table "chat_session" */
export enum Chat_Session_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "chat_session" */
export interface Chat_Session_Set_Input {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
}

/** Streaming cursor of the table "chat_session" */
export interface Chat_Session_Stream_Cursor_Input {
  /** Stream column input with initial value */
  initial_value: Chat_Session_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface Chat_Session_Stream_Cursor_Value_Input {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
}

/** update columns of table "chat_session" */
export enum Chat_Session_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export interface Chat_Session_Updates {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Chat_Session_Set_Input>;
  where: Chat_Session_Bool_Exp;
}

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "message" */
export interface Message {
  __typename?: 'message';
  created_at: Scalars['timestamptz'];
  from_id: Scalars['uuid'];
  group_id?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  text: Scalars['String'];
  to_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
}

/** aggregated selection of "message" */
export interface Message_Aggregate {
  __typename?: 'message_aggregate';
  aggregate?: Maybe<Message_Aggregate_Fields>;
  nodes: Message[];
}

export interface Message_Aggregate_Bool_Exp {
  count?: InputMaybe<Message_Aggregate_Bool_Exp_Count>;
}

export interface Message_Aggregate_Bool_Exp_Count {
  arguments?: InputMaybe<Message_Select_Column[]>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Message_Bool_Exp>;
  predicate: Int_Comparison_Exp;
}

/** aggregate fields of "message" */
export interface Message_Aggregate_Fields {
  __typename?: 'message_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Message_Max_Fields>;
  min?: Maybe<Message_Min_Fields>;
}

/** aggregate fields of "message" */
export interface Message_Aggregate_FieldsCountArgs {
  columns?: InputMaybe<Message_Select_Column[]>;
  distinct?: InputMaybe<Scalars['Boolean']>;
}

/** order by aggregate values of table "message" */
export interface Message_Aggregate_Order_By {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Message_Max_Order_By>;
  min?: InputMaybe<Message_Min_Order_By>;
}

/** input type for inserting array relation for remote table "message" */
export interface Message_Arr_Rel_Insert_Input {
  data: Message_Insert_Input[];
  /** upsert condition */
  on_conflict?: InputMaybe<Message_On_Conflict>;
}

/** Boolean expression to filter rows from the table "message". All fields are combined with a logical 'AND'. */
export interface Message_Bool_Exp {
  _and?: InputMaybe<Message_Bool_Exp[]>;
  _not?: InputMaybe<Message_Bool_Exp>;
  _or?: InputMaybe<Message_Bool_Exp[]>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  from_id?: InputMaybe<Uuid_Comparison_Exp>;
  group_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  text?: InputMaybe<String_Comparison_Exp>;
  to_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
}

/** unique or primary key constraints on table "message" */
export enum Message_Constraint {
  /** unique or primary key constraint on columns "id" */
  MessagePkey = 'message_pkey'
}

/** input type for inserting data into table "message" */
export interface Message_Insert_Input {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  from_id?: InputMaybe<Scalars['uuid']>;
  group_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  text?: InputMaybe<Scalars['String']>;
  to_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
}

/** aggregate max on columns */
export interface Message_Max_Fields {
  __typename?: 'message_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  from_id?: Maybe<Scalars['uuid']>;
  group_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
  to_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
}

/** order by max() on columns of table "message" */
export interface Message_Max_Order_By {
  created_at?: InputMaybe<Order_By>;
  from_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
  to_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
}

/** aggregate min on columns */
export interface Message_Min_Fields {
  __typename?: 'message_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  from_id?: Maybe<Scalars['uuid']>;
  group_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
  to_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
}

/** order by min() on columns of table "message" */
export interface Message_Min_Order_By {
  created_at?: InputMaybe<Order_By>;
  from_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
  to_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
}

/** response of any mutation on the table "message" */
export interface Message_Mutation_Response {
  __typename?: 'message_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Message[];
}

/** on_conflict condition type for table "message" */
export interface Message_On_Conflict {
  constraint: Message_Constraint;
  update_columns?: Message_Update_Column[];
  where?: InputMaybe<Message_Bool_Exp>;
}

/** Ordering options when selecting data from "message". */
export interface Message_Order_By {
  created_at?: InputMaybe<Order_By>;
  from_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
  to_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
}

/** primary key columns input for table: message */
export interface Message_Pk_Columns_Input {
  id: Scalars['uuid'];
}

/** select columns of table "message" */
export enum Message_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FromId = 'from_id',
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  Text = 'text',
  /** column name */
  ToId = 'to_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "message" */
export interface Message_Set_Input {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  from_id?: InputMaybe<Scalars['uuid']>;
  group_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  text?: InputMaybe<Scalars['String']>;
  to_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
}

/** Streaming cursor of the table "message" */
export interface Message_Stream_Cursor_Input {
  /** Stream column input with initial value */
  initial_value: Message_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface Message_Stream_Cursor_Value_Input {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  from_id?: InputMaybe<Scalars['uuid']>;
  group_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  text?: InputMaybe<Scalars['String']>;
  to_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
}

/** update columns of table "message" */
export enum Message_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FromId = 'from_id',
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  Text = 'text',
  /** column name */
  ToId = 'to_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export interface Message_Updates {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Message_Set_Input>;
  where: Message_Bool_Exp;
}

/** mutation root */
export interface Mutation_Root {
  __typename?: 'mutation_root';
  /** delete data from the table: "chat_member" */
  delete_chat_member?: Maybe<Chat_Member_Mutation_Response>;
  /** delete single row from the table: "chat_member" */
  delete_chat_member_by_pk?: Maybe<Chat_Member>;
  /** delete data from the table: "chat_session" */
  delete_chat_session?: Maybe<Chat_Session_Mutation_Response>;
  /** delete single row from the table: "chat_session" */
  delete_chat_session_by_pk?: Maybe<Chat_Session>;
  /** delete data from the table: "message" */
  delete_message?: Maybe<Message_Mutation_Response>;
  /** delete single row from the table: "message" */
  delete_message_by_pk?: Maybe<Message>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** insert data into the table: "chat_member" */
  insert_chat_member?: Maybe<Chat_Member_Mutation_Response>;
  /** insert a single row into the table: "chat_member" */
  insert_chat_member_one?: Maybe<Chat_Member>;
  /** insert data into the table: "chat_session" */
  insert_chat_session?: Maybe<Chat_Session_Mutation_Response>;
  /** insert a single row into the table: "chat_session" */
  insert_chat_session_one?: Maybe<Chat_Session>;
  /** insert data into the table: "message" */
  insert_message?: Maybe<Message_Mutation_Response>;
  /** insert a single row into the table: "message" */
  insert_message_one?: Maybe<Message>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** update data of the table: "chat_member" */
  update_chat_member?: Maybe<Chat_Member_Mutation_Response>;
  /** update single row of the table: "chat_member" */
  update_chat_member_by_pk?: Maybe<Chat_Member>;
  /** update multiples rows of table: "chat_member" */
  update_chat_member_many?: Maybe<Array<Maybe<Chat_Member_Mutation_Response>>>;
  /** update data of the table: "chat_session" */
  update_chat_session?: Maybe<Chat_Session_Mutation_Response>;
  /** update single row of the table: "chat_session" */
  update_chat_session_by_pk?: Maybe<Chat_Session>;
  /** update multiples rows of table: "chat_session" */
  update_chat_session_many?: Maybe<Array<Maybe<Chat_Session_Mutation_Response>>>;
  /** update data of the table: "message" */
  update_message?: Maybe<Message_Mutation_Response>;
  /** update single row of the table: "message" */
  update_message_by_pk?: Maybe<Message>;
  /** update multiples rows of table: "message" */
  update_message_many?: Maybe<Array<Maybe<Message_Mutation_Response>>>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
  /** update multiples rows of table: "user" */
  update_user_many?: Maybe<Array<Maybe<User_Mutation_Response>>>;
}

/** mutation root */
export interface Mutation_RootDelete_Chat_MemberArgs {
  where: Chat_Member_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootDelete_Chat_Member_By_PkArgs {
  id: Scalars['uuid'];
}

/** mutation root */
export interface Mutation_RootDelete_Chat_SessionArgs {
  where: Chat_Session_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootDelete_Chat_Session_By_PkArgs {
  id: Scalars['uuid'];
}

/** mutation root */
export interface Mutation_RootDelete_MessageArgs {
  where: Message_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootDelete_Message_By_PkArgs {
  id: Scalars['uuid'];
}

/** mutation root */
export interface Mutation_RootDelete_UserArgs {
  where: User_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootDelete_User_By_PkArgs {
  id: Scalars['uuid'];
}

/** mutation root */
export interface Mutation_RootInsert_Chat_MemberArgs {
  objects: Chat_Member_Insert_Input[];
  on_conflict?: InputMaybe<Chat_Member_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_Chat_Member_OneArgs {
  object: Chat_Member_Insert_Input;
  on_conflict?: InputMaybe<Chat_Member_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_Chat_SessionArgs {
  objects: Chat_Session_Insert_Input[];
  on_conflict?: InputMaybe<Chat_Session_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_Chat_Session_OneArgs {
  object: Chat_Session_Insert_Input;
  on_conflict?: InputMaybe<Chat_Session_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_MessageArgs {
  objects: Message_Insert_Input[];
  on_conflict?: InputMaybe<Message_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_Message_OneArgs {
  object: Message_Insert_Input;
  on_conflict?: InputMaybe<Message_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_UserArgs {
  objects: User_Insert_Input[];
  on_conflict?: InputMaybe<User_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_User_OneArgs {
  object: User_Insert_Input;
  on_conflict?: InputMaybe<User_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootUpdate_Chat_MemberArgs {
  _set?: InputMaybe<Chat_Member_Set_Input>;
  where: Chat_Member_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootUpdate_Chat_Member_By_PkArgs {
  _set?: InputMaybe<Chat_Member_Set_Input>;
  pk_columns: Chat_Member_Pk_Columns_Input;
}

/** mutation root */
export interface Mutation_RootUpdate_Chat_Member_ManyArgs {
  updates: Chat_Member_Updates[];
}

/** mutation root */
export interface Mutation_RootUpdate_Chat_SessionArgs {
  _set?: InputMaybe<Chat_Session_Set_Input>;
  where: Chat_Session_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootUpdate_Chat_Session_By_PkArgs {
  _set?: InputMaybe<Chat_Session_Set_Input>;
  pk_columns: Chat_Session_Pk_Columns_Input;
}

/** mutation root */
export interface Mutation_RootUpdate_Chat_Session_ManyArgs {
  updates: Chat_Session_Updates[];
}

/** mutation root */
export interface Mutation_RootUpdate_MessageArgs {
  _set?: InputMaybe<Message_Set_Input>;
  where: Message_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootUpdate_Message_By_PkArgs {
  _set?: InputMaybe<Message_Set_Input>;
  pk_columns: Message_Pk_Columns_Input;
}

/** mutation root */
export interface Mutation_RootUpdate_Message_ManyArgs {
  updates: Message_Updates[];
}

/** mutation root */
export interface Mutation_RootUpdate_UserArgs {
  _set?: InputMaybe<User_Set_Input>;
  where: User_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootUpdate_User_By_PkArgs {
  _set?: InputMaybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
}

/** mutation root */
export interface Mutation_RootUpdate_User_ManyArgs {
  updates: User_Updates[];
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export interface Query_Root {
  __typename?: 'query_root';
  /** fetch data from the table: "chat_member" */
  chat_member: Chat_Member[];
  /** fetch aggregated fields from the table: "chat_member" */
  chat_member_aggregate: Chat_Member_Aggregate;
  /** fetch data from the table: "chat_member" using primary key columns */
  chat_member_by_pk?: Maybe<Chat_Member>;
  /** fetch data from the table: "chat_session" */
  chat_session: Chat_Session[];
  /** fetch aggregated fields from the table: "chat_session" */
  chat_session_aggregate: Chat_Session_Aggregate;
  /** fetch data from the table: "chat_session" using primary key columns */
  chat_session_by_pk?: Maybe<Chat_Session>;
  /** fetch data from the table: "message" */
  message: Message[];
  /** fetch aggregated fields from the table: "message" */
  message_aggregate: Message_Aggregate;
  /** fetch data from the table: "message" using primary key columns */
  message_by_pk?: Maybe<Message>;
  /** fetch data from the table: "user" */
  user: User[];
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
}

export interface Query_RootChat_MemberArgs {
  distinct_on?: InputMaybe<Chat_Member_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Chat_Member_Order_By[]>;
  where?: InputMaybe<Chat_Member_Bool_Exp>;
}

export interface Query_RootChat_Member_AggregateArgs {
  distinct_on?: InputMaybe<Chat_Member_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Chat_Member_Order_By[]>;
  where?: InputMaybe<Chat_Member_Bool_Exp>;
}

export interface Query_RootChat_Member_By_PkArgs {
  id: Scalars['uuid'];
}

export interface Query_RootChat_SessionArgs {
  distinct_on?: InputMaybe<Chat_Session_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Chat_Session_Order_By[]>;
  where?: InputMaybe<Chat_Session_Bool_Exp>;
}

export interface Query_RootChat_Session_AggregateArgs {
  distinct_on?: InputMaybe<Chat_Session_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Chat_Session_Order_By[]>;
  where?: InputMaybe<Chat_Session_Bool_Exp>;
}

export interface Query_RootChat_Session_By_PkArgs {
  id: Scalars['uuid'];
}

export interface Query_RootMessageArgs {
  distinct_on?: InputMaybe<Message_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Message_Order_By[]>;
  where?: InputMaybe<Message_Bool_Exp>;
}

export interface Query_RootMessage_AggregateArgs {
  distinct_on?: InputMaybe<Message_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Message_Order_By[]>;
  where?: InputMaybe<Message_Bool_Exp>;
}

export interface Query_RootMessage_By_PkArgs {
  id: Scalars['uuid'];
}

export interface Query_RootUserArgs {
  distinct_on?: InputMaybe<User_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<User_Order_By[]>;
  where?: InputMaybe<User_Bool_Exp>;
}

export interface Query_RootUser_AggregateArgs {
  distinct_on?: InputMaybe<User_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<User_Order_By[]>;
  where?: InputMaybe<User_Bool_Exp>;
}

export interface Query_RootUser_By_PkArgs {
  id: Scalars['uuid'];
}

export interface Subscription_Root {
  __typename?: 'subscription_root';
  /** fetch data from the table: "chat_member" */
  chat_member: Chat_Member[];
  /** fetch aggregated fields from the table: "chat_member" */
  chat_member_aggregate: Chat_Member_Aggregate;
  /** fetch data from the table: "chat_member" using primary key columns */
  chat_member_by_pk?: Maybe<Chat_Member>;
  /** fetch data from the table in a streaming manner: "chat_member" */
  chat_member_stream: Chat_Member[];
  /** fetch data from the table: "chat_session" */
  chat_session: Chat_Session[];
  /** fetch aggregated fields from the table: "chat_session" */
  chat_session_aggregate: Chat_Session_Aggregate;
  /** fetch data from the table: "chat_session" using primary key columns */
  chat_session_by_pk?: Maybe<Chat_Session>;
  /** fetch data from the table in a streaming manner: "chat_session" */
  chat_session_stream: Chat_Session[];
  /** fetch data from the table: "message" */
  message: Message[];
  /** fetch aggregated fields from the table: "message" */
  message_aggregate: Message_Aggregate;
  /** fetch data from the table: "message" using primary key columns */
  message_by_pk?: Maybe<Message>;
  /** fetch data from the table in a streaming manner: "message" */
  message_stream: Message[];
  /** fetch data from the table: "user" */
  user: User[];
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table in a streaming manner: "user" */
  user_stream: User[];
}

export interface Subscription_RootChat_MemberArgs {
  distinct_on?: InputMaybe<Chat_Member_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Chat_Member_Order_By[]>;
  where?: InputMaybe<Chat_Member_Bool_Exp>;
}

export interface Subscription_RootChat_Member_AggregateArgs {
  distinct_on?: InputMaybe<Chat_Member_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Chat_Member_Order_By[]>;
  where?: InputMaybe<Chat_Member_Bool_Exp>;
}

export interface Subscription_RootChat_Member_By_PkArgs {
  id: Scalars['uuid'];
}

export interface Subscription_RootChat_Member_StreamArgs {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Chat_Member_Stream_Cursor_Input>>;
  where?: InputMaybe<Chat_Member_Bool_Exp>;
}

export interface Subscription_RootChat_SessionArgs {
  distinct_on?: InputMaybe<Chat_Session_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Chat_Session_Order_By[]>;
  where?: InputMaybe<Chat_Session_Bool_Exp>;
}

export interface Subscription_RootChat_Session_AggregateArgs {
  distinct_on?: InputMaybe<Chat_Session_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Chat_Session_Order_By[]>;
  where?: InputMaybe<Chat_Session_Bool_Exp>;
}

export interface Subscription_RootChat_Session_By_PkArgs {
  id: Scalars['uuid'];
}

export interface Subscription_RootChat_Session_StreamArgs {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Chat_Session_Stream_Cursor_Input>>;
  where?: InputMaybe<Chat_Session_Bool_Exp>;
}

export interface Subscription_RootMessageArgs {
  distinct_on?: InputMaybe<Message_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Message_Order_By[]>;
  where?: InputMaybe<Message_Bool_Exp>;
}

export interface Subscription_RootMessage_AggregateArgs {
  distinct_on?: InputMaybe<Message_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Message_Order_By[]>;
  where?: InputMaybe<Message_Bool_Exp>;
}

export interface Subscription_RootMessage_By_PkArgs {
  id: Scalars['uuid'];
}

export interface Subscription_RootMessage_StreamArgs {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Message_Stream_Cursor_Input>>;
  where?: InputMaybe<Message_Bool_Exp>;
}

export interface Subscription_RootUserArgs {
  distinct_on?: InputMaybe<User_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<User_Order_By[]>;
  where?: InputMaybe<User_Bool_Exp>;
}

export interface Subscription_RootUser_AggregateArgs {
  distinct_on?: InputMaybe<User_Select_Column[]>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<User_Order_By[]>;
  where?: InputMaybe<User_Bool_Exp>;
}

export interface Subscription_RootUser_By_PkArgs {
  id: Scalars['uuid'];
}

export interface Subscription_RootUser_StreamArgs {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<User_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Bool_Exp>;
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export interface Timestamptz_Comparison_Exp {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
}

/** columns and relationships of "user" */
export interface User {
  __typename?: 'user';
  cognito_id?: Maybe<Scalars['uuid']>;
  created_at: Scalars['timestamptz'];
  email?: Maybe<Scalars['String']>;
  first_name: Scalars['String'];
  id: Scalars['uuid'];
  last_name: Scalars['String'];
  updated_at: Scalars['timestamptz'];
}

/** aggregated selection of "user" */
export interface User_Aggregate {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: User[];
}

/** aggregate fields of "user" */
export interface User_Aggregate_Fields {
  __typename?: 'user_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
}

/** aggregate fields of "user" */
export interface User_Aggregate_FieldsCountArgs {
  columns?: InputMaybe<User_Select_Column[]>;
  distinct?: InputMaybe<Scalars['Boolean']>;
}

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export interface User_Bool_Exp {
  _and?: InputMaybe<User_Bool_Exp[]>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<User_Bool_Exp[]>;
  cognito_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
}

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserPkey = 'user_pkey'
}

/** input type for inserting data into table "user" */
export interface User_Insert_Input {
  cognito_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
}

/** aggregate max on columns */
export interface User_Max_Fields {
  __typename?: 'user_max_fields';
  cognito_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
}

/** aggregate min on columns */
export interface User_Min_Fields {
  __typename?: 'user_min_fields';
  cognito_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
}

/** response of any mutation on the table "user" */
export interface User_Mutation_Response {
  __typename?: 'user_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: User[];
}

/** input type for inserting object relation for remote table "user" */
export interface User_Obj_Rel_Insert_Input {
  data: User_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
}

/** on_conflict condition type for table "user" */
export interface User_On_Conflict {
  constraint: User_Constraint;
  update_columns?: User_Update_Column[];
  where?: InputMaybe<User_Bool_Exp>;
}

/** Ordering options when selecting data from "user". */
export interface User_Order_By {
  cognito_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
}

/** primary key columns input for table: user */
export interface User_Pk_Columns_Input {
  id: Scalars['uuid'];
}

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  CognitoId = 'cognito_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "user" */
export interface User_Set_Input {
  cognito_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
}

/** Streaming cursor of the table "user" */
export interface User_Stream_Cursor_Input {
  /** Stream column input with initial value */
  initial_value: User_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface User_Stream_Cursor_Value_Input {
  cognito_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  last_name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
}

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  CognitoId = 'cognito_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export interface User_Updates {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Set_Input>;
  where: User_Bool_Exp;
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export interface Uuid_Comparison_Exp {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
}

export type ChatSessionFragment = {
  id: any;
  created_at: any;
  updated_at: any;
  members: Array<
    {
      id: any;
      user_id: any;
      user?:
        | ({ id: any; first_name: string; last_name: string; email?: string | null } & { __typename?: 'user' })
        | null;
      messages: Array<
        { id: any; created_at: any; updated_at: any; from_id: any; to_id: any; text: string } & {
          __typename?: 'message';
        }
      >;
    } & { __typename?: 'chat_member' }
  >;
  messages: Array<
    { id: any; created_at: any; updated_at: any; from_id: any; to_id: any; text: string } & { __typename?: 'message' }
  >;
} & { __typename?: 'chat_session' };

export type MessageFragment = { id: any; created_at: any; updated_at: any; from_id: any; to_id: any; text: string } & {
  __typename?: 'message';
};

export type AddChatSessionMutationVariables = Exact<{
  data: Chat_Session_Insert_Input;
}>;

export type AddChatSessionMutation = {
  insert_chat_session_one?:
    | ({
        id: any;
        created_at: any;
        updated_at: any;
        members: Array<
          {
            id: any;
            user_id: any;
            user?:
              | ({ id: any; first_name: string; last_name: string; email?: string | null } & { __typename?: 'user' })
              | null;
            messages: Array<
              { id: any; created_at: any; updated_at: any; from_id: any; to_id: any; text: string } & {
                __typename?: 'message';
              }
            >;
          } & { __typename?: 'chat_member' }
        >;
        messages: Array<
          { id: any; created_at: any; updated_at: any; from_id: any; to_id: any; text: string } & {
            __typename?: 'message';
          }
        >;
      } & { __typename?: 'chat_session' })
    | null;
} & { __typename?: 'mutation_root' };

export type AddMessageMutationVariables = Exact<{
  data: Message_Insert_Input;
}>;

export type AddMessageMutation = {
  insert_message_one?:
    | ({ id: any; created_at: any; updated_at: any; from_id: any; to_id: any; text: string } & {
        __typename?: 'message';
      })
    | null;
} & { __typename?: 'mutation_root' };

export type GetChatSessionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetChatSessionsQuery = {
  chat_session: Array<
    {
      id: any;
      created_at: any;
      updated_at: any;
      members: Array<
        {
          id: any;
          user_id: any;
          user?:
            | ({ id: any; first_name: string; last_name: string; email?: string | null } & { __typename?: 'user' })
            | null;
          messages: Array<
            { id: any; created_at: any; updated_at: any; from_id: any; to_id: any; text: string } & {
              __typename?: 'message';
            }
          >;
        } & { __typename?: 'chat_member' }
      >;
      messages: Array<
        { id: any; created_at: any; updated_at: any; from_id: any; to_id: any; text: string } & {
          __typename?: 'message';
        }
      >;
    } & { __typename?: 'chat_session' }
  >;
} & { __typename?: 'query_root' };

export type GetChatSessionQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type GetChatSessionQuery = {
  chatSession?:
    | ({
        id: any;
        created_at: any;
        updated_at: any;
        members: Array<
          {
            id: any;
            user_id: any;
            user?:
              | ({ id: any; first_name: string; last_name: string; email?: string | null } & { __typename?: 'user' })
              | null;
            messages: Array<
              { id: any; created_at: any; updated_at: any; from_id: any; to_id: any; text: string } & {
                __typename?: 'message';
              }
            >;
          } & { __typename?: 'chat_member' }
        >;
        messages: Array<
          { id: any; created_at: any; updated_at: any; from_id: any; to_id: any; text: string } & {
            __typename?: 'message';
          }
        >;
      } & { __typename?: 'chat_session' })
    | null;
} & { __typename?: 'query_root' };

export type AddToChatSessionSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type AddToChatSessionSubscription = {
  chat_session_by_pk?:
    | ({
        id: any;
        created_at: any;
        updated_at: any;
        members: Array<
          {
            id: any;
            user_id: any;
            user?:
              | ({ id: any; first_name: string; last_name: string; email?: string | null } & { __typename?: 'user' })
              | null;
            messages: Array<
              { id: any; created_at: any; updated_at: any; from_id: any; to_id: any; text: string } & {
                __typename?: 'message';
              }
            >;
          } & { __typename?: 'chat_member' }
        >;
        messages: Array<
          { id: any; created_at: any; updated_at: any; from_id: any; to_id: any; text: string } & {
            __typename?: 'message';
          }
        >;
      } & { __typename?: 'chat_session' })
    | null;
} & { __typename?: 'subscription_root' };

export type UserFragment = {
  id: any;
  created_at: any;
  first_name: string;
  last_name: string;
  email?: string | null;
} & { __typename?: 'user' };

export type EditUserMutationVariables = Exact<{
  id: Scalars['uuid'];
  data: User_Set_Input;
}>;

export type EditUserMutation = {
  update_user_by_pk?:
    | ({ id: any; created_at: any; first_name: string; last_name: string; email?: string | null } & {
        __typename?: 'user';
      })
    | null;
} & { __typename?: 'mutation_root' };

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
  user: Array<
    { id: any; created_at: any; first_name: string; last_name: string; email?: string | null } & { __typename?: 'user' }
  >;
} & { __typename?: 'query_root' };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type GetUserByIdQuery = {
  user?:
    | ({ id: any; created_at: any; first_name: string; last_name: string; email?: string | null } & {
        __typename?: 'user';
      })
    | null;
} & { __typename?: 'query_root' };

export const ChatSessionFragment = `
    fragment ChatSession on chat_session {
  id
  created_at
  updated_at
  members {
    id
    user_id
    user {
      id
      first_name
      last_name
      email
    }
    messages: messages_sent {
      id
      created_at
      updated_at
      from_id
      to_id
      text
    }
  }
  messages {
    id
    created_at
    updated_at
    from_id
    to_id
    text
  }
}
    `;
export const MessageFragment = `
    fragment Message on message {
  id
  created_at
  updated_at
  from_id
  to_id
  text
}
    `;
export const UserFragment = `
    fragment User on user {
  id
  created_at
  first_name
  last_name
  email
}
    `;
export const AddChatSessionDocument = `
    mutation addChatSession($data: chat_session_insert_input!) {
  insert_chat_session_one(object: $data) {
    ...ChatSession
  }
}
    ${ChatSessionFragment}`;
export const useAddChatSessionMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<AddChatSessionMutation, TError, AddChatSessionMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<AddChatSessionMutation, TError, AddChatSessionMutationVariables, TContext>(
    ['addChatSession'],
    async (variables?: AddChatSessionMutationVariables) =>
      await fetcher<AddChatSessionMutation, AddChatSessionMutationVariables>(
        client,
        AddChatSessionDocument,
        variables,
        headers
      )(),
    options
  );
useAddChatSessionMutation.fetcher = (
  client: GraphQLClient,
  variables: AddChatSessionMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<AddChatSessionMutation, AddChatSessionMutationVariables>(client, AddChatSessionDocument, variables, headers);
export const AddMessageDocument = `
    mutation addMessage($data: message_insert_input!) {
  insert_message_one(object: $data) {
    ...Message
  }
}
    ${MessageFragment}`;
export const useAddMessageMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<AddMessageMutation, TError, AddMessageMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<AddMessageMutation, TError, AddMessageMutationVariables, TContext>(
    ['addMessage'],
    async (variables?: AddMessageMutationVariables) =>
      await fetcher<AddMessageMutation, AddMessageMutationVariables>(client, AddMessageDocument, variables, headers)(),
    options
  );
useAddMessageMutation.fetcher = (
  client: GraphQLClient,
  variables: AddMessageMutationVariables,
  headers?: RequestInit['headers']
) => fetcher<AddMessageMutation, AddMessageMutationVariables>(client, AddMessageDocument, variables, headers);
export const GetChatSessionsDocument = `
    query getChatSessions {
  chat_session {
    ...ChatSession
  }
}
    ${ChatSessionFragment}`;
export const useGetChatSessionsQuery = <TData = GetChatSessionsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetChatSessionsQueryVariables,
  options?: UseQueryOptions<GetChatSessionsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetChatSessionsQuery, TError, TData>(
    variables === undefined ? ['getChatSessions'] : ['getChatSessions', variables],
    fetcher<GetChatSessionsQuery, GetChatSessionsQueryVariables>(client, GetChatSessionsDocument, variables, headers),
    options
  );
useGetChatSessionsQuery.document = GetChatSessionsDocument;

useGetChatSessionsQuery.fetcher = (
  client: GraphQLClient,
  variables?: GetChatSessionsQueryVariables,
  headers?: RequestInit['headers']
) => fetcher<GetChatSessionsQuery, GetChatSessionsQueryVariables>(client, GetChatSessionsDocument, variables, headers);
export const GetChatSessionDocument = `
    query getChatSession($id: uuid!) {
  chatSession: chat_session_by_pk(id: $id) {
    ...ChatSession
  }
}
    ${ChatSessionFragment}`;
export const useGetChatSessionQuery = <TData = GetChatSessionQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetChatSessionQueryVariables,
  options?: UseQueryOptions<GetChatSessionQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetChatSessionQuery, TError, TData>(
    ['getChatSession', variables],
    fetcher<GetChatSessionQuery, GetChatSessionQueryVariables>(client, GetChatSessionDocument, variables, headers),
    options
  );
useGetChatSessionQuery.document = GetChatSessionDocument;

useGetChatSessionQuery.fetcher = (
  client: GraphQLClient,
  variables: GetChatSessionQueryVariables,
  headers?: RequestInit['headers']
) => fetcher<GetChatSessionQuery, GetChatSessionQueryVariables>(client, GetChatSessionDocument, variables, headers);
export const AddToChatSessionDocument = `
    subscription addToChatSession($id: uuid!) {
  chat_session_by_pk(id: $id) {
    ...ChatSession
  }
}
    ${ChatSessionFragment}`;
export const EditUserDocument = `
    mutation editUser($id: uuid!, $data: user_set_input!) {
  update_user_by_pk(pk_columns: {id: $id}, _set: $data) {
    ...User
  }
}
    ${UserFragment}`;
export const useEditUserMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<EditUserMutation, TError, EditUserMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<EditUserMutation, TError, EditUserMutationVariables, TContext>(
    ['editUser'],
    async (variables?: EditUserMutationVariables) =>
      await fetcher<EditUserMutation, EditUserMutationVariables>(client, EditUserDocument, variables, headers)(),
    options
  );
useEditUserMutation.fetcher = (
  client: GraphQLClient,
  variables: EditUserMutationVariables,
  headers?: RequestInit['headers']
) => fetcher<EditUserMutation, EditUserMutationVariables>(client, EditUserDocument, variables, headers);
export const GetUserDocument = `
    query getUser {
  user {
    ...User
  }
}
    ${UserFragment}`;
export const useGetUserQuery = <TData = GetUserQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetUserQueryVariables,
  options?: UseQueryOptions<GetUserQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetUserQuery, TError, TData>(
    variables === undefined ? ['getUser'] : ['getUser', variables],
    fetcher<GetUserQuery, GetUserQueryVariables>(client, GetUserDocument, variables, headers),
    options
  );
useGetUserQuery.document = GetUserDocument;

useGetUserQuery.fetcher = (
  client: GraphQLClient,
  variables?: GetUserQueryVariables,
  headers?: RequestInit['headers']
) => fetcher<GetUserQuery, GetUserQueryVariables>(client, GetUserDocument, variables, headers);
export const GetUserByIdDocument = `
    query getUserById($id: uuid!) {
  user: user_by_pk(id: $id) {
    ...User
  }
}
    ${UserFragment}`;
export const useGetUserByIdQuery = <TData = GetUserByIdQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetUserByIdQueryVariables,
  options?: UseQueryOptions<GetUserByIdQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetUserByIdQuery, TError, TData>(
    ['getUserById', variables],
    fetcher<GetUserByIdQuery, GetUserByIdQueryVariables>(client, GetUserByIdDocument, variables, headers),
    options
  );
useGetUserByIdQuery.document = GetUserByIdDocument;

useGetUserByIdQuery.fetcher = (
  client: GraphQLClient,
  variables: GetUserByIdQueryVariables,
  headers?: RequestInit['headers']
) => fetcher<GetUserByIdQuery, GetUserByIdQueryVariables>(client, GetUserByIdDocument, variables, headers);
