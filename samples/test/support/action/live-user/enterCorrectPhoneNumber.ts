import EnrollPhoneAuthenticator from '../../selectors/EnrollPhoneAuthenticator';
import setInputField from '../setInputField';
import ActionContext from '../../context';

export default async function (this: ActionContext) {
  await setInputField('set', this.credentials.phoneNumber, EnrollPhoneAuthenticator.phoneNumber);
}