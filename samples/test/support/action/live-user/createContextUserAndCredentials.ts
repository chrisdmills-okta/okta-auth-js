/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */


import createCredentials from '../../management-api/createCredentials';
import createUser from '../../management-api/createUser';
import ActionContext, {getReusedContext} from '../../context';

export default async function (this: ActionContext, firstName: string, assignToGroups?: string[]): Promise<void> {
  // Scenarios 10.1.4, 10.1.5
  const isSignUpWithTotp = this.scenarioName.includes(
    'Mary signs up for an account with Password, setups up required Google Authenticator'
  );
  // Scenario 10.1.3
  const isSignInWithTotp = this.featureName.includes('Google Authenticator') && 
    this.scenarioName.includes('Signs in');

  if (isSignInWithTotp) {
    // reuse context
    this.credentials = getReusedContext().credentials;
    this.sharedSecret = getReusedContext().sharedSecret;
    this.user = getReusedContext().user;
    this.userName = getReusedContext().userName;
  } else if (isSignUpWithTotp) {
    this.disableEmailVerification = true;
    this.credentials = this.credentials || await createCredentials(firstName, this.featureName, false);
  } else {
    const credentials = this.credentials || await createCredentials(firstName, this.featureName);
    this.credentials = credentials;
    const user = await createUser(credentials, assignToGroups);
    this.user = user;
  }
} 
