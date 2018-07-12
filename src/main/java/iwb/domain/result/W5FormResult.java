package iwb.domain.result;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import iwb.domain.db.W5ApprovalRecord;
import iwb.domain.db.W5ApprovalStep;
import iwb.domain.db.W5ConvertedObject;
import iwb.domain.db.W5Form;
import iwb.domain.db.W5FormCell;
import iwb.domain.db.W5FormSmsMailAlarm;
import iwb.domain.helper.W5FormCellHelper;
import iwb.domain.helper.W5QueuedDbFuncHelper;
import iwb.domain.helper.W5QueuedPushMessageHelper;
import iwb.domain.helper.W5SynchAfterPostHelper;
import iwb.util.FrameworkCache;


public class W5FormResult implements W5MetaResult{

	private	int	formId;
    private int action;
    private int	versionNo = 0;
    private short objectTip;
    
	private	W5Form form;
	private	List<W5FormCellHelper>	formCellResults;	
    private Map<String, Object> scd;
	private	Map<String, String>	errorMap;
	private Map<String,String> requestParams;
	private Map<String,Object> outputFields;
	private Map<String,Object> pkFields;
	private	List<String> outputMessages;
    private	W5ApprovalRecord approvalRecord;
    private	W5ApprovalStep approvalStep;
	private	int	commentCount;
	private	String	commentExtraInfo;
	private int pictureCount;
	private	int	fileAttachmentCount;
	private	int	keywordCount;
	private	int	accessControlCount;
	private	int	relationCount;
	private	int	mailSettingId;
	private	int	watchId;
	private	boolean	viewMode;
	private String liveSyncKey;
	private Map<Integer,W5FormResult> moduleFormMap;
	private	W5QueryResult queryResult4FormCell;
	private	List<W5FormCell> extraFormCells;
	private Map<Integer,W5GridResult> moduleGridMap;
	private String unique_id;
	private List<W5QueuedDbFuncHelper> queuedDbFuncList;
	private List<W5QueuedPushMessageHelper> queuedPushMessageList;
	private List<Map<String, String>> previewMapList;
	private List<Map<String, String>> previewConversionMapList;
	private Map<Integer, List<W5ConvertedObject>> mapConvertedObject;
	private Map<Integer,Map<Integer, Integer>> mapWidgetCount; //userId, widgetId, count
	private List<W5FormSmsMailAlarm> formAlarmList;

	public W5FormResult(int formId) {
		this.formId=formId;
		if(FrameworkCache.wDevEntityKeys.contains("40."+formId)){
			this.dev=true;
		}

	}
	public int getFormId() {
		return formId;
	}
	public void setFormId(int formId) {
		this.formId = formId;
	}
	public int getAction() {
		return action;
	}
	public void setAction(int action) {
		this.action = action;
	}
	public int getVersionNo() {
		return versionNo;
	}
	public void setVersionNo(int versionNo) {
		this.versionNo = versionNo;
	}
	public W5Form getForm() {
		return form;
	}
	public void setForm(W5Form form) {
		this.form = form;
	}
	public List<W5FormCellHelper> getFormCellResults() {
		return formCellResults;
	}
	public void setFormCellResults(List<W5FormCellHelper> formCellResults) {
		this.formCellResults = formCellResults;
	}
	public Map<String, Object> getScd() {
		return scd;
	}
	public void setScd(Map<String, Object> scd) {
		this.scd = scd;
	}
	public Map<String, String> getErrorMap() {
		return errorMap;
	}
	public void setErrorMap(Map<String, String> errorMap) {
		this.errorMap = errorMap;
	}
	public Map<String, String> getRequestParams() {
		return requestParams;
	}
	public void setRequestParams(Map<String, String> requestParams) {
		this.requestParams = requestParams;
	}
/*	public String getPkJson() {
		return pkJson;
	}
	public void setPkJson(String pkJson) {
		this.pkJson = pkJson;
	} */

	public Map<String, Object> getOutputFields() {
		return outputFields;
	}
	public void setOutputFields(Map<String, Object> outputFields) {
		this.outputFields = outputFields;
	}
	public Map<String, Object> getPkFields() {
		return pkFields;
	}
	public void setPkFields(Map<String, Object> pkFields) {
		this.pkFields = pkFields;
	}
	public short getObjectTip() {
		return objectTip;
	}
	public void setObjectTip(short objectTip) {
		this.objectTip = objectTip;
	}
	public List<String> getOutputMessages() {
		return outputMessages;
	}
	public void setOutputMessages(List<String> outputMessages) {
		this.outputMessages = outputMessages;
	}
	public W5ApprovalRecord getApprovalRecord() {
		return approvalRecord;
	}
	public void setApprovalRecord(W5ApprovalRecord approvalRecord) {
		this.approvalRecord = approvalRecord;
	}
	public int getCommentCount() {
		return commentCount;
	}
	public void setCommentCount(int commentCount) {
		this.commentCount = commentCount;
	}
	public int getPictureCount() {
		return pictureCount;
	}
	public void setPictureCount(int pictureCount) {
		this.pictureCount = pictureCount;
	}
	public int getFileAttachmentCount() {
		return fileAttachmentCount;
	}
	public void setFileAttachmentCount(int fileAttachmentCount) {
		this.fileAttachmentCount = fileAttachmentCount;
	}
	public boolean isViewMode() {
		return viewMode;
	}
	public void setViewMode(boolean viewMode) {
		this.viewMode = viewMode;
	}
	public int getKeywordCount() {
		return keywordCount;
	}
	public void setKeywordCount(int keywordCount) {
		this.keywordCount = keywordCount;
	}
	public int getAccessControlCount() {
		return accessControlCount;
	}
	public void setAccessControlCount(int accessControlCount) {
		this.accessControlCount = accessControlCount;
	}
	public int getRelationCount() {
		return relationCount;
	}
	public void setRelationCount(int relationCount) {
		this.relationCount = relationCount;
	}
	public Map<Integer, W5FormResult> getModuleFormMap() {
		return moduleFormMap;
	}
	public void setModuleFormMap(Map<Integer, W5FormResult> moduleFormMap) {
		this.moduleFormMap = moduleFormMap;
	}
	public int getMailSettingId() {
		return mailSettingId;
	}
	public void setMailSettingId(int mailSettingId) {
		this.mailSettingId = mailSettingId;
	}
	public W5QueryResult getQueryResult4FormCell() {
		return queryResult4FormCell;
	}
	public void setQueryResult4FormCell(W5QueryResult queryResult4FormCell) {
		this.queryResult4FormCell = queryResult4FormCell;
	}
	public List<W5FormCell> getExtraFormCells() {
		return extraFormCells;
	}
	public void setExtraFormCells(List<W5FormCell> extraFormCells) {
		this.extraFormCells = extraFormCells;
	}
	public Map<Integer, W5GridResult> getModuleGridMap() {
		return moduleGridMap;
	}
	public void setModuleGridMap(Map<Integer, W5GridResult> moduleGridMap) {
		this.moduleGridMap = moduleGridMap;
	}
	public int getWatchId() {
		return watchId;
	}
	public void setWatchId(int watchId) {
		this.watchId = watchId;
	}
	public String getUniqueId() {
		return unique_id;
	}
	public void setUniqueId(String unique_id) {
		this.unique_id = unique_id;
	}
	public List<W5QueuedDbFuncHelper> getQueuedDbFuncList() {
		return queuedDbFuncList;
	}
	public void setQueuedDbFuncList(List<W5QueuedDbFuncHelper> queuedDbFuncList) {
		this.queuedDbFuncList = queuedDbFuncList;
	}
	public W5ApprovalStep getApprovalStep() {
		return approvalStep;
	}
	public void setApprovalStep(W5ApprovalStep approvalStep) {
		this.approvalStep = approvalStep;
	}

	public List<Map<String, String>> getPreviewMapList() {
		return previewMapList;
	}
	public void setPreviewMapList(List<Map<String, String>> previewMapList) {
		this.previewMapList = previewMapList;
	}
	public List<Map<String, String>> getPreviewConversionMapList() {
		return previewConversionMapList;
	}
	public void setPreviewConversionMapList(
			List<Map<String, String>> previewConversionMapList) {
		this.previewConversionMapList = previewConversionMapList;
	}
	public Map<Integer, List<W5ConvertedObject>> getMapConvertedObject() {
		return mapConvertedObject;
	}
	public void setMapConvertedObject(
			Map<Integer, List<W5ConvertedObject>> mapConvertedObject) {
		this.mapConvertedObject = mapConvertedObject;
	}
	public Map<Integer, Map<Integer, Integer>> getMapWidgetCount() {
		return mapWidgetCount;
	}
	public void setMapWidgetCount(Map<Integer, Map<Integer, Integer>> mapWidgetCount) {
		this.mapWidgetCount = mapWidgetCount;
	}
	public List<W5QueuedPushMessageHelper> getQueuedPushMessageList() {
		return queuedPushMessageList;
	}
	public void setQueuedPushMessageList(
			List<W5QueuedPushMessageHelper> queuedPushMessageList) {
		this.queuedPushMessageList = queuedPushMessageList;
	}
	public List<W5FormSmsMailAlarm> getFormAlarmList() {
		return formAlarmList;
	}
	public void setFormAlarmList(List<W5FormSmsMailAlarm> formAlarmList) {
		this.formAlarmList = formAlarmList;
	}
	public String getLiveSyncKey() {
		return liveSyncKey;
	}
	public void setLiveSyncKey(String liveSyncKey) {
		this.liveSyncKey = liveSyncKey;
	}
	public String getCommentExtraInfo() {
		return commentExtraInfo;
	}
	public void setCommentExtraInfo(String commentExtraInfo) {
		this.commentExtraInfo = commentExtraInfo;
	}
	
	private	List<W5SynchAfterPostHelper> listSyncAfterPostHelper;
	
	public void addSyncRecordAll(List<W5SynchAfterPostHelper> l) {
		if(l==null)return;
		if(listSyncAfterPostHelper==null)listSyncAfterPostHelper=new ArrayList<W5SynchAfterPostHelper>();
		listSyncAfterPostHelper.addAll(l);
	}
	public void addSyncRecord(W5SynchAfterPostHelper r) {
		if(listSyncAfterPostHelper==null)listSyncAfterPostHelper=new ArrayList<W5SynchAfterPostHelper>();
		listSyncAfterPostHelper.add(r);
	}
	public List<W5SynchAfterPostHelper> getListSyncAfterPostHelper() {
		return listSyncAfterPostHelper;
	}
	public void setListSyncAfterPostHelper(
			List<W5SynchAfterPostHelper> listSyncAfterPostHelper) {
		this.listSyncAfterPostHelper = listSyncAfterPostHelper;
	}

	private boolean dev = false;
	
	public boolean isDev() {
		return dev;
	}
	public void setDev(boolean dev) {
		this.dev = dev;
	}
	
	
}

